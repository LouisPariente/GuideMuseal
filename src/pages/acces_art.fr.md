---
id: '06'
title: "Acces à l'art"
description: "Accès à l'art"
templateKey: home
tags:
  - web
lang: fr
date: "29-06-2020"
image: /img/bannieres/4504_low.jpg
heading: "Vers une approche de découverte tactile d'œuvres d’art"
path: /fr/acces_art
slug: /fr/acces_art
---

# 1.  Introduction

L’accès à l’art et à la culture pour les personnes présentant une incapacité visuelle (PPIV) est souvent complexe, la majorité des œuvres exposées dans les musées reposant sur la dimension visuelle. 
Des solutions pour pallier ce problème existent actuellement, telles que les audiodescriptions ou la réalisation de modèles 3D permettant l’exploration tactile de l’œuvre. Cependant, ces solutions amènent leur lot de limitations : les audiodescriptions sont séquentielles et passives car nécessitent de l’écoute et monopolisent l’attention de l’utilisateur. Les impressions 3D ou supports thermoformés sont en général coûteux à fabriquer et produisent trop de détails au toucher, ce qui demande l’assistance d’une personne pour aider à sa compréhension.

L’exploration autonome tactile constitue un défi actuel et nécessite une simplification des formes. Or chaque œuvre d’art étant spécifique, les méthodes automatiques classiques n’apportent pas de solution adaptative universelle. Il est de plus important qu’une exploration active (guidée par le regard ou le doigt) permette une représentation mentale de l’objet, ce que les audiodescriptions ne proposent pas toujours car elles sont souvent conçues par des personnes sans incapacité visuelle.

Dans l’objectif d’améliorer l’accessibilité à l’art et la culture pour les PPIV, nous développons une solution matérielle permettant d’afficher des œuvres d’art « transformées » combinant les perceptions tactile, kinesthésique et audio, et permettant leur exploration active, ainsi que des solutions logicielles pour faciliter la simplification vers cette représentation multimodale.

# 2. Représentation tactile d’une œuvre
    
Une œuvre se doit avant tout d’avoir des contours mis en évidence pour détecter les objets représentés, leur nombre et leur emplacement relatif aux autres objets faisant partie de cette œuvre. Pour distinguer les objets dans l’image (premier et deuxième plan), la simplification de l’image doit permettre une meilleure compréhension pour l’observateur qui aura ainsi la connaissance des frontières et catégories d’objets représentés.

La perspective, élément visuel, gêne la reconnaissance. Un objet dessiné, simplement mis en relief (2D ½) a peu de rapport avec l’expérience tactile de cet objet. La projection d’un objet sur une surface correspond toujours à des repères visuels. Sa reconnaissance dépend des hypothèses culturelles de notre mémoire. Il faut donc apprendre à interpréter ce type d’images. Une représentation tactile doit être simplifiée par rapport à une représentation visuelle en ne conservant que l’information essentielle permettant sa reconnaissance. Elle doit « préserver le sens global » de l’objet représenté [[1]](#ref1)

# 3.  Segmentation sémantique
    

Une segmentation sémantique permet de regrouper des parties de l’image dans des catégories simplifiées. Deux approches sont possibles pour appréhender la simplification d’une œuvre d’art : (1) Détection de contours des éléments visibles dans le tableau ; (2) Segmentation des régions appartenant à un élément par rapport aux autres régions.

Ces deux classes de méthodes ont pour objectif de simplifier l’image en éliminant ou simplifiant grandement les informations contenues (couleurs, détails, etc.) et en séparant le contenu en zones grossières correspondant aux frontières d’éléments connus, permettant de faciliter l’interprétation de l’organisation spatiale du contenu de l’image.

### 3.1 Détection de contours

La détection de contours consiste à repérer les bords des éléments saillants d’un tableau par rapport au contraste des pixels. Les méthodes classiques (filtres passe-haut/sharpening kernels, Canny, etc.) ne permettent pas d’avoir des contours complets car elles sont tributaires de l’éclairage et de la texture des images.

L’approche HED (Holistically Nested Edge Detection) est une architecture de réseaux de neurones convolutifs de bout en bout [[2]](#ref2) inspiré par les réseaux de neurones entièrement convolutifs. Basée sur la perception humaine dans la recherche des contours des objets, elle utilise les différents niveaux de perception, l’information structurelle, le contexte.

<div align="center">

![Détail de la Tapisserie de Bayeux scène n°16](../img/acces_fig1_1.jpg )  |![Contours obtenus avec l’approche HED](../img/acces_fig1_2.jpg) |
-------------------------|-------------------------|
Fig. 1 Détail de la Tapisserie de Bayeux scène n°16 (gauche).| Contours obtenus avec l’approche HED (droite)|

</div>

### 3.2 Segmentation en régions

La segmentation d’une image consiste à séparer ses éléments en objets distincts. Ces méthodes comprennent plusieurs approches dont (1) K-means, algorithme de regroupement de régions (clustering). (2) Modèle de mélanges Gaussiens [[3]](#ref3) : méthode d’apprentissage qui sert à estimer la distribution de variables aléatoires en les modélisant comme une somme de plusieurs gaussiennes, et se calcule itérativement via l’algorithme Espérance-Maximisation (EM). (3) Deeplab V3 [[4]](#ref4) : Réseau de neurones convolutif profond, utilisé pour la segmentation sémantique des images naturelles. Il se caractérise par une architecture Encodage-Décodage. (4) Slic Superpixels [[5]](#ref5) : divise l’image en groupes de pixels connectés avec des couleurs similaires.

Notre approche : Un prétraitement est effectué pour choisir l’objet de façon semi-automatique : Nous appliquons la méthode Mean-shift pour uniformiser les couleurs (moins de clusters), ensuite la méthode grabcut pour extraire un objet et réduire l’erreur induite par la proximité spatiale.

Sur l’objet extrait, nous appliquons GMM (car K-means induit une erreur supérieure) pour obtenir une segmentation en régions de notre image.

Ensuite, pour un découpage plus intuitif tactile avec des détails pertinents et du relief, on applique HED (contours) sur l’image GMM (régions). On obtient des contours simplifiés, plus lisses et plus faciles à suivre tactilement.

<div align="center">

![Image GMM du cavalier](../img/acces_fig2_1.jpg)  |![HED appliqué à l’image GMM](../img/acces_fig2_2.jpg) |
-------------------------|-------------------------|
Fig 2. Image GMM du cavalier (gauche). |HED appliqué à l’image GMM (droite).|

</div>

# 4.  Dispositif d’affichage audio-tactile
    

Divers types de technologies permettent de transmettre des informations par le toucher (par exemple les matrices de taxels et les surfaces vibrantes). Cependant, les dispositifs actuels ne permettent pas un affichage simultané de contours physiques et de textures et restent peu abordables. Après la revue et l’évaluation de différentes technologies nous avons développé notre propre dispositif : une tablette à retour de force (F2T).

<div align="center">

![Image GMM du cavalier](../img/acces_fig3_1.jpg)  |![HED appliqué à l’image GMM](../img/acces_fig3_2.png) |
-------------------------|-------------------------|
Fig. 2 : Prototype F2T (à gauche). | Étude de concept (à droite)|

</div>


L’exploration est contrôlée par un micro-joystick sur support motorisé et mobile, qui communique par des variations de retour de force, permettant de créer différents effets passifs (en réponse aux mouvements de l’utilisateur) ou actifs (guidage). Une combinaison audio-tactile est possible aussi en incorporant des sons d’ambiance et de l’audiodescription (sémantique). Des évaluations préliminaires de la F2T ont été effectuées sur la reconnaissance de formes géométriques simples, des directions, des angles perçus et de structures spatiales (agencement de pièces).

# 5.  Conclusion et perspectives
    

Cette communication présente une solution développée pour les Musées pour améliorer l’accessibilité aux œuvres d’art pour les PPIV. Basée sur une interface audio-tactile novatrice, cette solution permet l’exploration active et indépendante d’œuvres d’Art simplifiée en une représentation plus intuitive pour les PPIV, par une solution combinant détection de contours et segmentation sémantique. La recherche continue pour modifier le processus de segmentation afin de le rendre collaboratif et interactif. Nous prévoyons notamment le développement d’interfaces graphiques intuitives, afin que la segmentation puisse être manuellement ajustée (Méthode de Superpixels) par des spécialistes tels que des conservateurs de musées, pour mieux restituer les intentions de l’auteur de l’œuvre.

_Partenaires_

Partenariat avec associations PPIV (FAF, ANL, AVH) ainsi que Le Musée de la Tapisserie de Bayeux, Ville de Bayeux, Le Musée du Château de Martainville et le Musée du quai de Branly.

_Références_

<a name="ref1">[1]</a>  E. Pissaloux, K. Romeo, P. Ancet, M. Chottin. _Access to artworks and its mediation by and for visually impaired people._ ICCHP 2018, Computers Helping People with Special Needs, 16th Int. Conf. Linz, Austria, July 11-13, 2018, p233-236
    
<a name="ref2">[2]</a>  Saining Xie and Zhuowen Tu. 2017. Holistically-Nested Edge Detection. _Int. J. Comput. Vision_ 125, 1-3 (December 2017), 3-18. DOI: [https://doi.org/10.1007/s11263-017-1004-z](https://doi.org/10.1007/s11263-017-1004-z)
    
<a name="ref3">[3]</a>  Reynolds, Douglas A.. “Gaussian Mixture Models.” _Encyclopedia of Biometrics_ (2009).
    
<a name="ref4">[4]</a>  DeepLab : Deep Convolutional Networks - Chen, Liang-Chieh, et al. "Deeplab: Semantic image segmentation with deep convolutional nets, atrous convolution, and fully connected crfs." _IEEE transactions on pattern analysis and machine intelligence_ 40.4 (2017): 834-848.
    
<a name="ref5">[5]</a>  R. Achanta, K. Smith, A. Lucchi, P. Fua, S. Susstrunk, Slic Superpixels, Technical Reposrt, EPFL, 149300, 2010
