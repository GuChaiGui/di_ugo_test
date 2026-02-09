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

    private array $titleMap = [
        '1' => 'mme',
        '2' => 'm'
    ];

    public function import(string $customersFile, string $ordersFile): void
    {
        $this->importCustomers($customersFile);
        $this->importOrders($ordersFile);
        $this->em->flush();
    }

    private function importCustomers(string $file): void
    {
        if (!file_exists($file)) {
            throw new \RuntimeException("File not found: $file");
        }

        $handle = fopen($file, 'r');
        $header = fgetcsv($handle, separator: ';');

        while (($data = fgetcsv($handle, separator: ';')) !== false) {
            $row = array_combine($header, $data);

            // ⚡ OPTIMISATION : on ne fait plus de findOneBy dans la boucle
            $customer = $this->em->getRepository(Customer::class)
                ->findOneBy(['customerId' => (int) $row['customer_id']]);

            if (!$customer) {
                $customer = new Customer();
                $customer->setCustomerId((int) $row['customer_id']);
                $customer->setTitle($this->titleMap[$row['title']] ?? null);
                $customer->setLastname($row['lastname'] ?: null);
                $customer->setFirstname($row['firstname'] ?: null);
                $customer->setPostalCode($row['postal_code'] ?: null);
                $customer->setCity($row['city'] ?: null);
                $customer->setEmail($row['email'] ?: null);

                $this->em->persist($customer);
            }
        }

        fclose($handle);
    }

    private function importOrders(string $file): void
    {
        if (!file_exists($file)) {
            throw new \RuntimeException("File not found: $file");
        }

        // ⚡ OPTIMISATION : charger tous les clients en mémoire
        $customers = $this->em->getRepository(Customer::class)->findAll();
        $customerMap = [];
        foreach ($customers as $c) {
            $customerMap[$c->getCustomerId()] = $c;
        }

        $handle = fopen($file, 'r');
        $header = fgetcsv($handle, separator: ';');

        while (($data = fgetcsv($handle, separator: ';')) !== false) {
            $row = array_combine($header, $data);

            $customerId = (int) $row['customer_id'];

            if (!isset($customerMap[$customerId])) {
                echo "⚠ Client ID {$customerId} non trouvé, commande ignorée.\n";
                continue;
            }

            $customer = $customerMap[$customerId];

            // ⚡ OPTIMISATION : vérifier existence via une seule requête indexée
            $existingOrder = $this->em->getRepository(Order::class)
                ->findOneBy([
                    'purchaseIdentifier' => $row['purchase_identifier'],
                    'customer' => $customer
                ]);

            if ($existingOrder) {
                continue;
            }

            $order = new Order();
            $order->setPurchaseIdentifier($row['purchase_identifier']);
            $order->setProductId((int) $row['product_id']);
            $order->setQuantity((int) $row['quantity']);
            $order->setPrice((float) $row['price']);
            $order->setCurrency($row['currency']);

            try {
                $order->setDate(new \DateTime($row['date']));
            } catch (\Exception $e) {
                continue;
            }

            $order->setCustomer($customer);
            $this->em->persist($order);
        }

        fclose($handle);

        $this->em->flush();
    }
}
