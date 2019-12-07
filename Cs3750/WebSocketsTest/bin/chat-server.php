<?php
ini_set('display_errors', 1);
// ini_set('html_errors', 1);
error_reporting(E_ALL);
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use ChatApp\Chat;

    require dirname(__DIR__) . '/vendor/autoload.php';

    $server = IoServer::factory(
        new HttpServer(
            new WsServer(
                new Chat()
            )
        ),
        8080
    );

    $server->run();