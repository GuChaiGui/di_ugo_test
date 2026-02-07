<?php

namespace App\Service;

use App\Entity\Customer;
use App\Entity\Order;
use Doctrine\ORM\EntityManagerInterface;

class CsvImporter
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function import(string $customersFile, string $ordersFile): void
    {
        $this->importCustomers($customersFile);
        $this->importOrders($ordersFile);
        $this->em->flush();
    }

    private function importCustomers(string $file): void
    {
        // TODO : lecture du CSV et création Customer
    }

    private function importOrders(string $file): void
    {
        // TODO : lecture du CSV et création Order
    }
}