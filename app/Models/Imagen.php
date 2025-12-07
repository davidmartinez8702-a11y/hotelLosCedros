<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Facades\Storage;

class Imagen extends Model
{
    //
    protected $table = 'imagenes';
    protected $fillable = [
        'url_image',
    ];
    public function imageable(): MorphTo
    {
        return $this->morphTo();
    }

    public function getUrlAttribute()
    {
        return Storage::url($this->url_image);
    }
}
