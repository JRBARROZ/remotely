<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Project;

class ProjectTest extends TestCase
{
    /**
     * @depends Tests\Unit\UserTest::successfully_login
     */
    public function test_check_post_project($value)
    {
        $token = $value["access_token"];

        $this->withHeaders([
            "Authorization:" => "Bearer " . $token,
        ])->post("/api/project/add", [
            'name' => "Murielson",
            'status' => "1",
            'creator_id' => "1",
            'org_id' => "1",
        ])->assertStatus(200);
    }
}
