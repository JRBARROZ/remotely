<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Tymon\JWTAuth\JWTAuth;
use Illuminate\Http\Request;
use App\Models\Organization;
use App\Models\Project;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user_id = auth()->user()->id;

        if(Project::where('creator_id','=',$user_id)->where('id','=',$request->project_id)->count() ==1) {
            $task = Task::create(["title" => $request->title, "description" => $request->description,"status" => $request->status,"creator_id"=> $request->creator_id,
            "project_id"=> $request->project_id,"deadline"=> $request->deadline]);
            Task::find($task->id)->users()->attach($user_id);
            return response("Success",200);
        }else{
            return response("Forbidden",403);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */

     /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList()
    {
        $user_id = auth()->user()->id;
        $taskList = Task::whereHas('users', function ($query) use ($user_id) {
            $query->where('user_id',$user_id);
        })->select('id','title','description','status','project_id','deadline','created_at','updated_at')->get();
        return response()->json($taskList);
    }

    
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        //
    }
}
