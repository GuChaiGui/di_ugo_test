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

    // Mapping title CSV -> texte
    private array $titleMap = [
        '1' => 'mme',
        '2' => 'm'
    ];

    // import clients and orders
    public function import(string $customersFile, string $ordersFile): void
    {
        $this->importCustomers($customersFile);
        $this->importOrders($ordersFile);
        $this->em->flush();
    }

    // lecture du CSV et création Customer
    private function importCustomers(string $file): void
    {
        if (!file_exists($file)) {
            throw new \RuntimeException("File not found: $file");
        }

        $handle = fopen($file, 'r');
        $header = fgetcsv($handle, separator: ';'); // Lecture de l'en-tête

        while (($data = fgetcsv($handle, separator: ';')) !== false) {
            $row = array_combine($header, $data);


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

    // lecture du CSV et création Order

    private function importOrders(string $file): void
    {
        if (!file_exists($file)) {
            throw new \RuntimeException("File not found: $file");
        }

        $handle = fopen($file, 'r');
        $header = fgetcsv($handle, separator: ';');

        while (($data = fgetcsv($handle, separator: ';')) !== false) {
            $row = array_combine($header, $data);

            // Chercher le client correspondant
            $customer = $this->em->getRepository(Customer::class)
                ->findOneBy(['customerId' => (int) $row['customer_id']]);

            if (!$customer) {
                echo "⚠ Client ID {$row['customer_id']} non trouvé, commande ignorée.\n";
                continue;
            }

            // Vérifier si la commande existe déjà pour ce client
            $existingOrder = $this->em->getRepository(Order::class)
                ->findOneBy([
                    'purchaseIdentifier' => $row['purchase_identifier'],
                    'customer' => $customer
                ]);

            if ($existingOrder) {
                echo "ℹ Commande {$row['purchase_identifier']} pour le client {$row['customer_id']} déjà existante, ignorée.\n";
                continue;
            }

            // Créer la commande
            $order = new Order();
            $order->setPurchaseIdentifier($row['purchase_identifier']);
            $order->setProductId((int) $row['product_id']);
            $order->setQuantity((int) $row['quantity']);
            $order->setPrice((float) $row['price']);
            $order->setCurrency($row['currency']);

            try {
                $order->setDate(new \DateTime($row['date']));
            } catch (\Exception $e) {
                echo "⚠ Erreur sur la date {$row['date']} pour commande {$row['purchase_identifier']}\n";
                continue;
            }

            $order->setCustomer($customer);

            $this->em->persist($order);
        }

        fclose($handle);

        // On flush toutes les commandes à la fin pour améliorer les performances
        $this->em->flush();

        echo "✅ Import des commandes terminé.\n";
    }
}