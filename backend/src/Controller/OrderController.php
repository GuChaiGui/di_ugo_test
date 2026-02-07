<?php

namespace App\Controller;

use App\Repository\CustomerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/customers/{customerId}/orders', name: 'orders_')]
class OrderController extends AbstractController
{
    #[Route('', name: 'list', methods: ['GET'])]
    public function orders(int $customerId, CustomerRepository $customerRepository): JsonResponse
    {
        $customer = $customerRepository->findOneBy(['customerId' => $customerId]);

        if (!$customer) {
            return $this->json(['error' => 'Client non trouvé'], 404);
        }

        $data = array_map(fn($o) => [
            'purchase_identifier' => $o->getPurchaseIdentifier(),
            'product_id' => $o->getProductId(),
            'quantity' => $o->getQuantity(),
            'price' => $o->getPrice(),
            'currency' => $o->getCurrency(),
            'date' => $o->getDate()?->format('Y-m-d'),
        ], $customer->getOrders()->toArray());

        return $this->json($data);
    }
}