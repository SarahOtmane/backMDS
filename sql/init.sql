-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : lun. 15 juil. 2024 à 22:24
-- Version du serveur : 11.4.2-MariaDB-ubu2404
-- Version de PHP : 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `db`
--

-- --------------------------------------------------------

--
-- Structure de la table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `street_address` varchar(255) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `addresses`
--

INSERT INTO `addresses` (`id`, `street_address`, `city`, `postal_code`, `country`, `created_at`, `updated_at`) VALUES
(1, '23 rue solférino', 'BOULOGNE-BILLANCOURT', '92100', 'France', '2024-07-15 22:02:09', '2024-07-15 22:02:09'),
(2, '4  Rue Maurice Chevalier', 'GOUSSAINVILLE', '95190', 'France', '2024-07-15 22:03:40', '2024-07-15 22:03:40');

-- --------------------------------------------------------

--
-- Structure de la table `artisans`
--

CREATE TABLE `artisans` (
  `id` int(11) NOT NULL,
  `accept_new_order` tinyint(1) NOT NULL DEFAULT 0,
  `siret` varchar(255) NOT NULL,
  `tva` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `name_job` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `artisans`
--

INSERT INTO `artisans` (`id`, `accept_new_order`, `siret`, `tva`, `description`, `picture`, `created_at`, `updated_at`, `name_job`) VALUES
(1, 1, '60203644', 'FR9360203644', '', '', '2024-07-15 22:02:09', '2024-07-15 22:02:09', 'cordonnerie'),
(2, 1, '60203644', 'FR9360203644', '', '', '2024-07-15 22:03:40', '2024-07-15 22:03:40', 'couture');

-- --------------------------------------------------------

--
-- Structure de la table `clothes`
--

CREATE TABLE `clothes` (
  `id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `cloth_type` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `name_job` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `clothes`
--

INSERT INTO `clothes` (`id`, `category`, `cloth_type`, `created_at`, `updated_at`, `name_job`) VALUES
(1, 'Manteaux/vestes', 'Doudoune', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'couture'),
(2, 'Manteaux/vestes', 'Manteau', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'couture'),
(3, 'Manteaux/vestes', 'Veste - Blouson', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'couture'),
(4, 'Manteaux/vestes', 'Veste en cuir', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'couture'),
(5, 'Haut', 'pull - gilet', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'couture'),
(6, 'Haut', 'Sweat - Hoodie', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'couture'),
(7, 'Haut', 'Chemise', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'couture'),
(8, 'Haut', 'Polo - T-shirt', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'couture'),
(9, 'Bas', 'Jean', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'couture'),
(10, 'Bas', 'Short - Jupes - pantalon divers', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'couture'),
(11, 'Autres', 'Salopette - combi - robe', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'couture'),
(12, 'Autres', 'Lingerie - Maillot de bain', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'couture'),
(13, 'Ceinture', 'Cuir', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'maroquinnerie'),
(14, 'Ceinture', 'Daim - Nubuck', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'maroquinnerie'),
(15, 'Sac', 'Cuir', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'maroquinnerie'),
(16, 'sac', 'Daim - Nubuck', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'maroquinnerie'),
(17, 'sac', 'Textile', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'maroquinnerie'),
(18, 'Portefeuille', 'cuir', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'maroquinnerie'),
(19, 'Portefeuille', 'Daim - Nubuck', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'maroquinnerie'),
(20, 'Chaussure', 'cuir', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'cordonnerie'),
(21, 'Chaussure', 'Daim', '2024-05-30 19:35:44', '2024-05-30 19:35:44', 'cordonnerie');

-- --------------------------------------------------------

--
-- Structure de la table `commands`
--

CREATE TABLE `commands` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `date_finished` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `email_user` varchar(255) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `id_cloth` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `commands`
--

INSERT INTO `commands` (`id`, `name`, `picture`, `date_finished`, `created_at`, `updated_at`, `email_user`, `id_product`, `id_cloth`) VALUES
(1, '1721081217580', '', NULL, '2024-07-15 22:07:04', '2024-07-15 22:07:04', 'sarah1@user.com', 12, 20);

-- --------------------------------------------------------

--
-- Structure de la table `infos`
--

CREATE TABLE `infos` (
  `name` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

CREATE TABLE `jobs` (
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `jobs`
--

INSERT INTO `jobs` (`name`, `created_at`, `updated_at`) VALUES
('cordonnerie', '2024-05-30 19:37:37', '2024-05-30 19:37:37'),
('couture', '2024-05-30 19:35:44', '2024-05-30 19:35:44'),
('maroquinnerie', '2024-05-30 19:36:53', '2024-05-30 19:36:53');

-- --------------------------------------------------------

--
-- Structure de la table `newsletters`
--

CREATE TABLE `newsletters` (
  `email` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `persons`
--

CREATE TABLE `persons` (
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `subscribe_newsletter` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `id_address` int(11) DEFAULT NULL,
  `id_artisan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `persons`
--

INSERT INTO `persons` (`email`, `password`, `role`, `firstname`, `lastname`, `mobile`, `subscribe_newsletter`, `created_at`, `updated_at`, `id_address`, `id_artisan`) VALUES
('max@artisan.gmail', '$argon2id$v=19$m=65536,t=3,p=4$nMMyWfvMbkga+aMoZ/oE3g$bIsYdHCUmIIPUgRN6nE3W3Dt76wDLGhnK6c/XTJj4gA', 'artisan', 'Max', 'Richet', '06 03 28 52 98', 0, '2024-07-15 22:02:09', '2024-07-15 22:11:55', 1, 1),
('otmanesarah02@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$D+S1HZGBL8wYSivB7QXdKQ$OjNdFyypXJJ7ge0AOp7puHzmxJa06NoxvqU/EVYuDH0', 'artisan', 'Sarouche', 'Otmane', '07 79 22 21 12', 0, '2024-07-15 22:03:40', '2024-07-15 22:12:45', 2, 2),
('sarah1@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$OTiztkOmrxilXWcRljr0bg$loqGuiLNDue9ohTd+zqQ2mvRZqV9gvBVD0bILDtEnJs', 'user', 'sarah1', 'user1', '0603285298', 0, '2024-07-15 21:57:08', '2024-07-15 21:57:08', NULL, NULL),
('sarah1@user.com', '$argon2id$v=19$m=65536,t=3,p=4$9oXkrV4sEBNgyZ93FEQqyQ$+Q1hxuE/kpS2Wn7En1V5yCa8xpfEcBziDQryPpXQonw', 'user', 'Sarah', 'Otmane', '07 79 22 21 12', 0, '2024-07-15 22:05:42', '2024-07-15 22:05:42', NULL, NULL),
('sarahotmane02@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$DSM2KAXO+Se9vLGnjVzadA$gn4CHAoFk3kEBxrfrCOw46RbTAo8oxgxfGg6Iz1k/J0', 'admin', 'Sarah', 'Otmane', '06 03 28 52 98', 0, '2024-07-15 21:59:45', '2024-07-15 21:59:45', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `prestations`
--

CREATE TABLE `prestations` (
  `id` int(11) NOT NULL,
  `reparation_type` varchar(255) NOT NULL,
  `price_suggested` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `name_job` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `prestations`
--

INSERT INTO `prestations` (`id`, `reparation_type`, `price_suggested`, `created_at`, `updated_at`, `name_job`) VALUES
(1, 'Nettoyer - cirer', 25, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'cordonnerie'),
(2, 'poser des patins', 20, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'cordonnerie'),
(3, 'Mettre en forme - agrandir', 25, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'cordonnerie'),
(4, 'poser des fers', 30, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'cordonnerie'),
(5, 'protection complète: patins et fers', 50, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'cordonnerie'),
(6, 'Réparation: Sali - taché - décoloré', 15, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'cordonnerie'),
(7, 'Réparation: Semelle extérieure', 15, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'cordonnerie'),
(8, 'Réparation: Talon', 20, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'cordonnerie'),
(9, 'Réparation: zip', 30, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'cordonnerie'),
(10, 'Réparation: Oeillets - Rivets', 11, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'cordonnerie'),
(11, 'Réparation: l\'intérieur', 23, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'cordonnerie'),
(12, 'Renover le cuir', 55, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'cordonnerie'),
(13, 'Patiner', 23, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'cordonnerie'),
(14, 'Usé - Décolorer', 20, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'maroquinnerie'),
(15, 'Imperméabiliser', 25, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'maroquinnerie'),
(16, 'Percer un trou supplémentaire', 10, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'maroquinnerie'),
(17, 'Fermoir', 15, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'maroquinnerie'),
(18, 'Chaussures : couture décousue', 11, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'maroquinnerie'),
(19, 'Entretien sac < 25cm', 20, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'maroquinnerie'),
(20, 'Entretien sac entre 25cm et 40cm', 30, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'maroquinnerie'),
(21, 'Entretien sac > 40cm', 40, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'maroquinnerie'),
(22, 'Réparer sac < 25cm', 25, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'maroquinnerie'),
(23, 'Réparer sac entre 25cm et 40cm', 35, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'maroquinnerie'),
(24, 'Réparer sac > 40cm', 45, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'maroquinnerie'),
(25, 'Recolorer sac < 25cm', 35, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'maroquinnerie'),
(26, 'Recolorer sac entre 25cm et 40cm', 45, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'maroquinnerie'),
(27, 'Recolorer sac > 40cm', 55, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'maroquinnerie'),
(28, 'Zip - Fermeture', 11, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'couture'),
(29, 'Trou - Accroc - Déchirure', 16, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'couture'),
(30, 'Couture décousue', 10, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'couture'),
(31, 'Bouton', 10, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'couture'),
(32, 'Pression/Scratch', 11, '2024-05-30 19:41:58', '2024-05-30 19:41:58', 'couture');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `id_prestation` int(11) DEFAULT NULL,
  `id_artisan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `price`, `created_at`, `updated_at`, `id_prestation`, `id_artisan`) VALUES
(1, 25, '2024-07-15 22:02:09', '2024-07-15 22:02:09', 1, 1),
(2, 20, '2024-07-15 22:02:09', '2024-07-15 22:02:09', 2, 1),
(3, 25, '2024-07-15 22:02:09', '2024-07-15 22:02:09', 3, 1),
(4, 50, '2024-07-15 22:02:09', '2024-07-15 22:02:09', 5, 1),
(5, 30, '2024-07-15 22:02:09', '2024-07-15 22:02:09', 4, 1),
(6, 15, '2024-07-15 22:02:09', '2024-07-15 22:02:09', 6, 1),
(7, 15, '2024-07-15 22:02:09', '2024-07-15 22:02:09', 7, 1),
(8, 30, '2024-07-15 22:02:09', '2024-07-15 22:02:09', 9, 1),
(9, 20, '2024-07-15 22:02:09', '2024-07-15 22:02:09', 8, 1),
(10, 11, '2024-07-15 22:02:09', '2024-07-15 22:02:09', 10, 1),
(11, 23, '2024-07-15 22:02:09', '2024-07-15 22:02:09', 13, 1),
(12, 55, '2024-07-15 22:02:09', '2024-07-15 22:02:09', 12, 1),
(13, 23, '2024-07-15 22:02:09', '2024-07-15 22:02:09', 11, 1),
(14, 11, '2024-07-15 22:03:40', '2024-07-15 22:03:40', 28, 2),
(15, 16, '2024-07-15 22:03:40', '2024-07-15 22:03:40', 29, 2),
(16, 10, '2024-07-15 22:03:40', '2024-07-15 22:03:40', 30, 2),
(17, 11, '2024-07-15 22:03:40', '2024-07-15 22:03:40', 32, 2),
(18, 10, '2024-07-15 22:03:40', '2024-07-15 22:03:40', 31, 2);

-- --------------------------------------------------------

--
-- Structure de la table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `stars` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `email_user` varchar(255) DEFAULT NULL,
  `id_artisan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `artisans`
--
ALTER TABLE `artisans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name_job` (`name_job`);

--
-- Index pour la table `clothes`
--
ALTER TABLE `clothes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name_job` (`name_job`);

--
-- Index pour la table `commands`
--
ALTER TABLE `commands`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email_user` (`email_user`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_cloth` (`id_cloth`);

--
-- Index pour la table `infos`
--
ALTER TABLE `infos`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `newsletters`
--
ALTER TABLE `newsletters`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_address` (`id_address`),
  ADD KEY `id_artisan` (`id_artisan`);

--
-- Index pour la table `prestations`
--
ALTER TABLE `prestations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reparation_type` (`reparation_type`),
  ADD KEY `name_job` (`name_job`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_prestation` (`id_prestation`),
  ADD KEY `id_artisan` (`id_artisan`);

--
-- Index pour la table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email_user` (`email_user`),
  ADD KEY `id_artisan` (`id_artisan`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `artisans`
--
ALTER TABLE `artisans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `clothes`
--
ALTER TABLE `clothes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `commands`
--
ALTER TABLE `commands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `prestations`
--
ALTER TABLE `prestations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `artisans`
--
ALTER TABLE `artisans`
  ADD CONSTRAINT `artisans_ibfk_1` FOREIGN KEY (`name_job`) REFERENCES `jobs` (`name`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `clothes`
--
ALTER TABLE `clothes`
  ADD CONSTRAINT `clothes_ibfk_1` FOREIGN KEY (`name_job`) REFERENCES `jobs` (`name`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `commands`
--
ALTER TABLE `commands`
  ADD CONSTRAINT `commands_ibfk_1` FOREIGN KEY (`email_user`) REFERENCES `persons` (`email`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `commands_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `commands_ibfk_3` FOREIGN KEY (`id_cloth`) REFERENCES `clothes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `persons`
--
ALTER TABLE `persons`
  ADD CONSTRAINT `persons_ibfk_1` FOREIGN KEY (`id_address`) REFERENCES `addresses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `persons_ibfk_2` FOREIGN KEY (`id_artisan`) REFERENCES `artisans` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `prestations`
--
ALTER TABLE `prestations`
  ADD CONSTRAINT `prestations_ibfk_1` FOREIGN KEY (`name_job`) REFERENCES `jobs` (`name`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_prestation`) REFERENCES `prestations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`id_artisan`) REFERENCES `artisans` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `testimonials`
--
ALTER TABLE `testimonials`
  ADD CONSTRAINT `testimonials_ibfk_1` FOREIGN KEY (`email_user`) REFERENCES `persons` (`email`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `testimonials_ibfk_2` FOREIGN KEY (`id_artisan`) REFERENCES `artisans` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
