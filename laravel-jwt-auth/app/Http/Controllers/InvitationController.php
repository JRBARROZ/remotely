<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invitation;
use App\Models\Organization;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;

class InvitationController extends Controller
{
   /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $creator_id = auth()->user()->id;
        $invited_user_id = User::where('email', $request->email)->first()->id;
        
        if($invited_user_id == $creator_id){
            return response("Bad request", 400);
        }
        if($request->entityType == "org"){
            if(Organization::where('creator_id', $creator_id)->where('id', $request->entityId)->count() == 1){
                if(Invitation::where("org_id", $request->entityId)->where("user_id", $invited_user_id)->where('is_valid', 1)->count() == 0){
                    Invitation::create(["org_id" => $request->entityId, "user_id" => $invited_user_id]);
                    return response("Ok", 200);
                }
            }
            return response("Forbidden", 403);
        } else {
            echo "Proj";
        }
    }

    public function accept(Request $request){
        $invited_user_id = auth()->user()->id;
        $invite = Invitation::where('user_id', $invited_user_id)->where('org_id', $request->orgId)->where('is_valid', true);
       
        if($invite->count() == 1){
            $invite_id = $invite->first()->id;
            $org = Organization::find($request->orgId);
            $invite->update(
                ['is_valid' => 0,
                 'accepted_at' => now()]
            );
            if(Invitation::find($invite_id)->is_valid == false){
                $org->users()->attach($invited_user_id, [
                    'role' => 'collaborator',
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
                $org_projects = Project::where('org_id', $org->id)->get(); 
                foreach($org_projects as $project){
                    $project->users()->attach($invited_user_id);
                    $tasks = Task::where('project_id', $project->id)->get();
                    if($tasks->count() > 0){
                        foreach($tasks as $task){
                            $task->users()->attach($invited_user_id);
                        }
                    }
                }
                return response("Success", 200);
            }
            return response("Forbidden", 403);
        }            
    }
}
