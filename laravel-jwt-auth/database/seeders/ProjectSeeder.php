<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\User;

class ProjectSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Project::factory(3)
		->hasAttached(
			User::inRandomOrder()->limit(5)->get(),
		)
		->create();
	}
}
