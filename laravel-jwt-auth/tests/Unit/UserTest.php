<?php

namespace Tests\Unit;

use Carbon\Carbon;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    // use RefreshDatabase;

    /** @test */
    public function successfully_register_user()
    {
        $this->post(
            '/api/auth/register',
            [
                'name' => 'Márcio da Silva',
                'email' => 'marcio@mail.com',
                'password' => '123456',
                'password_confirmation' => '123456',
                "email_verified_at" => Carbon::now(),
            ]
        )->assertStatus(201);
    }

    /**
     * @test
     */
    public function successfully_login()
    {
        // $this->post(
        //     '/api/auth/register',
        //     [
        //         'name' => 'Márcio da Silva',
        //         'email' => 'marcio@mail.com',
        //         'password' => '123456',
        //         'password_confirmation' => '123456',
        //     ]
        // );

        $response =  $this->post(
            '/api/auth/login',
            [
                'email' => 'maegan.wehner@example.net',
                'password' => '123456'
            ]
        );
        $response->assertStatus(200);
        return $response;
    }
}
