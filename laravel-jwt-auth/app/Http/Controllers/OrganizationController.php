<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;

class OrganizationController extends Controller
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user_id = auth()->user()->id;
        $org = Organization::create(["name" => $request->name, "creator_id" => $user_id]);
        Organization::find($org->id)->users()->attach($user_id, [
            'role' => 'creator',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        return response("Success", 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Organization  $organization
     * @return \Illuminate\Http\Response
     */


    public function show(Organization $organization)
    {
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList()
    {
        $user_id = auth()->user()->id;
        $orgList = Organization::whereHas('users', function ($query) use ($user_id) {
            $query->where('user_id', $user_id);
        })->select('created_at', 'id', 'name', 'updated_at')->get();
        return response()->json($orgList);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Organization  $organization
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user_id = auth()->user()->id;
        if (Organization::where('creator_id', '=', $user_id)->where('id', '=', $request->id)->count() == 1) {
            Organization::where('creator_id', '=', $user_id)->where('id', '=', $request->id)->update(["name" => $request->name]);
            return response("Updated", 200);
        } else {
            return response("Forbidden", 403);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Organization  $organization
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user_id = auth()->user()->id;
        if (Organization::where('creator_id', '=', $user_id)->where('id', '=', $id)->count() == 1) {
            Organization::where('creator_id', '=', $user_id)->where('id', '=', $id)->delete();
            return response("Deleted", 200);
        } else {
            return response("Forbidden", 403);
        }
    }
}
