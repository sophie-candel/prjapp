<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class IdDepartementResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);

        return [
            'id_dep' => $this->id_dep,
            'nom' => $this->nom_dep,
            'couleur' => $this->couleur_dep
        ];
    }

    /*
    public function with($request)
    {
        return [
            'version' => '1.0.0',
            'author' => 'Vgenevois'
        ];
    }
    */
}
