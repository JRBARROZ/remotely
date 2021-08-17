<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use Tymon\JWTAuth\JWTAuth;
use App\Models\Organization;

class ProjectController extends Controller
{
    // /**
	//  * Create a new ProjectController instance.
	//  *
	//  * @return void
	//  */
	// public function __construct()
	// {
	// 	$this->middleware('verified');
	// }
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
        if (Organization::where('creator_id', '=', $user_id)->where('id', '=', $request->orgId)->count() == 1) {
            $proj = Project::create(["name" => $request->name, "status" => $request->status, "creator_id" => $user_id, "org_id" => $request->orgId]);
            Project::find($proj->id)->users()->attach($user_id);
            return response("Success", 200);
        } else {
            return response("Forbidden", 403);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList()
    {
        $user_id = auth()->user()->id;
        $projList = Project::whereHas('users', function ($query) use ($user_id) {
            $query->where('user_id', $user_id);
        })->select('created_at', 'id', 'name', 'org_id', 'status', 'updated_at')->get();
        return response()->json($projList);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user_id = auth()->user()->id;
        if (Project::where('creator_id', '=', $user_id)->where('id', '=', $request->id)->count() == 1) {
            Project::where('creator_id', '=', $user_id)->where('id', '=', $request->id)->update(["name" => $request->name, "status" => $request->status]);
            return response("Updated", 200);
        } else {
            return response("Forbidden", 403);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user_id = auth()->user()->id;
        if (Project::where('creator_id', '=', $user_id)->where('id', '=', $id)->count() == 1) {
            Project::where('creator_id', '=', $user_id)->where('id', '=', $id)->delete();
            return response("Deleted", 200);
        } else {
            return response("Forbidden", 403);
        }
    }
}
