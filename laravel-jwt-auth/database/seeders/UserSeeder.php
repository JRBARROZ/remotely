<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Organization;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
			User::factory()
			->count(15)
			->hasAttached(
				Organization::factory()->count(2),
				['role' => 'collaborator']
			)
			->create();
		}
}
