<?php

namespace App\Controller;

use App\Repository\CustomerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/customers', name: 'customers_')]
class CustomerController extends AbstractController
{
    // GET /customers
    #[Route('', name: 'list', methods: ['GET'])]
    public function list(CustomerRepository $customerRepository): JsonResponse
    {
        $customers = $customerRepository->findAll();

        $data = array_map(fn($c) => [
            'id' => $c->getCustomerId(),
            'title' => $c->getTitle(),
            'lastname' => $c->getLastname(),
            'firstname' => $c->getFirstname(),
            'postal_code' => $c->getPostalCode(),
            'city' => $c->getCity(),
            'email' => $c->getEmail(),
        ], $customers);

        return $this->json($data);
    }
}