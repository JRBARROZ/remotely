<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders;

class DatabaseSeeder extends Seeder
{
	/**
	 * Seed the application's database.
	 *
	 * @return void
	 */
	public function run()
	{
		$this->call([
			UserSeeder::class,
			OrganizationSeeder::class,
			ProjectSeeder::class,
			TaskSeeder::class,
		]);
	}
}
