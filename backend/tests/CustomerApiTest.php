<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class CustomerApiTest extends WebTestCase
{
    public function testGetCustomers(): void
    {
        $client = static::createClient();
        $client->request('GET', '/customers');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame(
            'content-type',
            'application/json'
        );
    }
}