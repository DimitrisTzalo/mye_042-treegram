## Internet Technologies 2024 - Treegram Application

## Contributors

-Dimitrios Pagonis

-Dimitrios Tzalokostas

## Overview

This repository contains a Ruby on Rails application designed for photo sharing and social interaction among users. It enables users to upload and manage photos, follow other users, view photo slideshows, and engage through comments and tagging.

## Important Note
The project has been splitted in 2 phases
Phase 1: Extend Treegram with titles, follows, and comments using Ruby, Ruby on Rails, Haml, SQLite3.
More imformations can be found in Readme.pdf

Phase 2: Implement photo slideshow and comments popup. using JavaScript, jQuery, Ajax, Ruby on Rails, Haml, CSS.

More imformations can be found in Report.pdf


## Main Features

## 1. Photo Management

 Photo Uploading: Users can upload photos with mandatory titles.

 Validation: Titles are validated for presence upon photo upload.

 Photo Deletion: Photos and their associated tags and comments can be deleted by their owners.

## 2. User Interactions

 Following System: Users can follow or unfollow other users, establishing follower-followed relationships.

 Comments: Users can comment on photos. Comments can be deleted by either the commenter or the photo owner.

 Tags: Users can tag other users in photos.

## 3. Slideshow Presentation

 Photos are displayed as a slideshow, automatically cycling through images every 3 seconds.

 Slideshow pauses on mouse hover and resumes upon mouse exit.

 Users can click on images to view them in an expanded popup with comments.

## 4. Interactive Popups

 Clicking on photos opens a detailed popup displaying the image, its caption, and user comments.

 Users can add or delete comments directly within the popup.

## 5. Double-click Deletion Feature

 Photos can be quickly deleted with a double-click, if owned by the user. Confirmation prompts prevent accidental deletions.

## Technologies Used

Ruby on Rails

ActiveRecord for ORM

HAML for views

JavaScript (jQuery) for interactive features

AJAX for asynchronous interactions

## Setup Instructions

1. Clone the repository:

 ``` bash
git clone <repository-url>
cd <repository-folder>
 ```

2. Install dependencies:

`bundle install`

3. Setup Database:
``` bash
rails db:create
rails db:migrate
```
4. Run the application:
```bash
rails server
```
## Routes Overview

User profiles and photo management under /users

Photo interactions including comments at nested routes under /photos

## Additional Notes

All sensitive interactions like photo and comment deletions are protected by user ownership verification.

The UI leverages AJAX extensively for seamless user interactions without full page reloads.

## Special Thanks
I would like to sincerely thank my collaborator, Dimitrios Pagonis, for his valuable contribution and support throughout the project.

Modified for the undergraduate course MYE042 Internet Technologies (Department of Computer Science and 
Engineering, School of Engineering, University of Ioannina, Greece) by Mr. Stergios Anastasiadis. 
