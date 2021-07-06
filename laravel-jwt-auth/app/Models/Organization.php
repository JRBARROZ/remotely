<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;


class Organization extends Model
{
	use HasFactory, Notifiable;

	public function users()
	{
		return $this->belongsToMany(User::class);
	}

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'name',
		'creator_id'
	];
}
