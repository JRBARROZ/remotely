<?php

namespace Database\Factories;

use App\Models\Organization;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
	/**
	 * The name of the factory's corresponding model.
	 *
	 * @var string
	 */
	protected $model = Project::class;

	/**
	 * Define the model's default state.
	 *
	 * @return array
	 */
	public function definition()
	{
		return [
			'name' => $this->faker->bs(),
			'status' => $this->faker->boolean(),
			'creator_id' => User::inRandomOrder()->first()->id,
			'org_id' => Organization::inRandomOrder()->first()->id
		];
	}
}
