<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $users = [
            [
                'full_name' => 'Aji Setiawan',
                'name' => 'Aji',
                'email' => 'ajiisetiawan09@gmail.com',
                'job_title' => 'Administrator',
                'image' => null,
                'access' => 'admin',
                'password' => Hash::make('password'),
            ],
            [
                'full_name' => 'Ricky R Setiyawan',
                'name' => 'Ricky',
                'job_title' => 'Producer',
                'image' => 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/NQAHcDNVDV3cYycBJx0c/pub/V5JpFHKUwjRSBlOUgGka.jpeg ',
                'email' => 'welliamrick@gmail.com',
                'access' => 'producer',
                'password' => Hash::make('password'),
            ],
            [
                'full_name' => 'David Suwarto',
                'name' => 'Pak David',
                'job_title' => 'Executive Producer',
                'image' => 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/NQAHcDNVDV3cYycBJx0c/pub/LXOU5A4ond2G1uLUSt0V.jpeg ',
                'email' => 'david@sinemart.com',
                'access' => 'crew',
                'password' => Hash::make('password'),

            ],
            [
                'full_name' => 'Anggraini',
                'name' => 'Ang',
                'job_title' => 'Production Assistant',
                'image' => null,
                'email' => 'debyanggra@gmail.com',
                'access' => 'assistant_producer',
                'password' => Hash::make('password'),
            ],
            [
                'full_name' => 'Rini Atmojo',
                'name' => 'Rini',
                'job_title' => 'Line Producer',
                'image' => 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/ATNLaaCcWTFjYWxEaFqg/pub/5JvAlDpEErS43kxMJVxs.jpeg ',
                'email' => " ",
                'access' => 'producer',
                'password' => Hash::make('password'),
            ],
            [
                'full_name' => 'Bayu Eko Moektito',
                'name' => 'Bayu SKAK',
                'job_title' => 'Director',
                'image' => 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/ATNLaaCcWTFjYWxEaFqg/pub/SHFBJhlntIqovknUAlFZ.jpeg ',
                'email' => 'bayuskak@skakstudios.com',
                'access' => 'producer',
                'password' => Hash::make('password'),
            ],
            [
                'full_name' => 'Achmad Faishol',
                'name' => 'Achmad Faishol',
                'job_title' => 'Script Writer',
                'image' => 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/ATNLaaCcWTFjYWxEaFqg/pub/z2xEwEPgySHM3iyfWTvQ.jpeg ',
                'email' => 'ach.faishol@gmail.com',
                'access' => 'crew',
                'password' => Hash::make('password'),
            ],
            [
                'full_name' => 'Achmad Rofiq',
                'name' => 'Rofiq',
                'job_title' => 'Head IP Development',
                'image' => 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/NQAHcDNVDV3cYycBJx0c/pub/7m3K8YhXWJ823hzpCsBh.jpeg ',
                'email' => 'achmadrofiq88@gmail.com',
                'access' => 'crew',
                'password' => Hash::make('password'),
            ],
            [
                'full_name' => 'Adrianus',
                'name' => 'Adri',
                'job_title' => 'Producer Team',
                'image' => null,
                'email' => 'adrianus@sinemart.com',
                'access' => 'crew',
                'password' => Hash::make('password'),
            ],
            [
                'full_name' => 'Elminah Tan',
                'name' => 'Bu Elminah',
                'job_title' => 'Producer Team',
                'image' => null,
                'email' => 'elminahtan@gmail.com',
                'access' => 'producer',
                'password' => Hash::make('password'),
            ],
            [
                'full_name' => 'Lili Sunawati',
                'name' => 'Bu Lili',
                'job_title' => 'Producer Team',
                'image' => 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/NQAHcDNVDV3cYycBJx0c/pub/djlXZxPwEjLTYpjGbtkO.jpeg ',
                'email' => 'lili.sunawati@gmail.com',
                'access' => 'producer',
                'password' => Hash::make('password'),
            ],
            [
                'full_name' => 'Ricky R',
                'name' => 'Ricky',
                'job_title' => 'Producer Team',
                'image' => 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/NQAHcDNVDV3cYycBJx0c/pub/OosIvYSeDR8dCIWIhJLh.jpeg ',
                'email' => 'setiyawanramadhan@gmail.com',
                'access' => 'producer',
                'password' => Hash::make('password'),
            ],
        ];

        // Insert data ke tabel users
        DB::table('users')->insert($users);
    }
}
