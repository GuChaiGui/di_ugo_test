<?php

namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use App\Service\CsvImporter;

#[AsCommand(
    name: 'ugo:orders:import',
    description: 'Add a short description for your command',
)]
class UgoOrdersImportCommand extends Command
{
    private CsvImporter $importer;

    public function __construct(CsvImporter $importer)
    {
        parent::__construct();
        $this->importer = $importer;
    }

    protected function configure(): void
    {
        $this
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $csvDir = __DIR__ . '/../../import/';
        $customersFile = $csvDir . 'customers.csv';
        $ordersFile = $csvDir . 'purchases.csv';

        $this->importer->import($customersFile, $ordersFile);

        $io->success('CSV import completed successfully!');

        return Command::SUCCESS;
    }
}
