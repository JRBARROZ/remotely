<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    public function users()
	{
		return $this->belongsToMany(User::class);
	}

	protected $fillable = [
		'title',
		'description',
		'status',
		'creator_id',
		'project_id',
		'priority',
		'deadline',
	];
}
