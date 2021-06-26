<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;


class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Task::factory(2)
        ->hasAttached(
        User::whereHas('projects', function($query){
            $query->where('project_id', 1);
        })->inRandomOrder()->limit(3)->get()
        )->create();
        
    }
}
