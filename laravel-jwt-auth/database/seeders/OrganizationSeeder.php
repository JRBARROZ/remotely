<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrganizationSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Organization::factory(5)
		->hasAttached(
			User::inRandomOrder()->limit(4)->get(),
			['role' => 'collaborator',
			'created_at' => now(),
			'updated_at' => now()]
		)
		->create();
	}
}
