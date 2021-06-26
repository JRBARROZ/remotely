<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Task::class;

    /**
     * Define the modeDatabase\Factories\
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' =>$this->faker->sentence(10),
            'status' => $this->faker->boolean(),
            'deadline' => $this->faker->date(),
            'creator_id' => User::whereHas('projects', function($query){
                $query->where('project_id', 1);
            })->inRandomOrder()->first()->id,
            'project_id' => Project::find(1)->id,
        ];
    }
}
