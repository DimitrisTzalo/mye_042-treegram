Web Technologies 2024 - Treegram Application

Contributors

Dimitrios Pagonis (ΑΜ: 4985)

Dimitrios Tzalokostas (ΑΜ: 4994)

Overview

This repository contains a Ruby on Rails application designed for photo sharing and social interaction among users. It enables users to upload and manage photos, follow other users, view photo slideshows, and engage through comments and tagging.

Main Features

1. Photo Management

Photo Uploading: Users can upload photos with mandatory titles.

Validation: Titles are validated for presence upon photo upload.

Photo Deletion: Photos and their associated tags and comments can be deleted by their owners.

2. User Interactions

Following System: Users can follow or unfollow other users, establishing follower-followed relationships.

Comments: Users can comment on photos. Comments can be deleted by either the commenter or the photo owner.

Tags: Users can tag other users in photos.

3. Slideshow Presentation

Photos are displayed as a slideshow, automatically cycling through images every 3 seconds.

Slideshow pauses on mouse hover and resumes upon mouse exit.

Users can click on images to view them in an expanded popup with comments.

4. Interactive Popups

Clicking on photos opens a detailed popup displaying the image, its caption, and user comments.

Users can add or delete comments directly within the popup.

5. Double-click Deletion Feature

Photos can be quickly deleted with a double-click, if owned by the user. Confirmation prompts prevent accidental deletions.

Technologies Used

Ruby on Rails

ActiveRecord for ORM

HAML for views

JavaScript (jQuery) for interactive features

AJAX for asynchronous interactions

Setup Instructions

Clone the repository:

git clone <repository-url>
cd <repository-folder>

Install dependencies:

bundle install

Setup Database:

rails db:create
rails db:migrate

Run the application:

rails server

Routes Overview

Home: /

User profiles and photo management under /users

Photo interactions including comments at nested routes under /photos

Additional Notes

All sensitive interactions like photo and comment deletions are protected by user ownership verification.

The UI leverages AJAX extensively for seamless user interactions without full page reloads.
