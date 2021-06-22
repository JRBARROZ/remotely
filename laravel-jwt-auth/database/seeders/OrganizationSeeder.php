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
		Organization::factory()
		->count(5)
		->hasAttached(
			User::factory()->count(4),
			['role' => 'collaborator']
		)
		->create();
	}
}
