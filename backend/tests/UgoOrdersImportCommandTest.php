<?php

namespace App\Tests\Command;

use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Tester\CommandTester;
use App\Command\UgoOrdersImportCommand;

class UgoOrdersImportCommandTest extends KernelTestCase
{
    public function testCommandRunsSuccessfully(): void
    {
        self::bootKernel();

        $application = new Application(self::$kernel);
        $command = $application->find('ugo:orders:import');

        $commandTester = new CommandTester($command);
        $commandTester->execute([]);

        $this->assertEquals(0, $commandTester->getStatusCode());
    }
}