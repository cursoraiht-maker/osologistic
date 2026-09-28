CREATE TABLE `quote_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`serviceType` enum('personal','paqueteria','ambos') NOT NULL,
	`origin` varchar(100) NOT NULL,
	`destination` varchar(100) NOT NULL,
	`travelDate` varchar(50),
	`passengers` int,
	`packageDescription` text,
	`message` text,
	`status` enum('pendiente','contactado','cotizado','cerrado') NOT NULL DEFAULT 'pendiente',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quote_requests_id` PRIMARY KEY(`id`)
);
