# The Duck Experince Website
[The Duck Experience](https://dux.bertant.dev/feed) website provides a space for Stevens Students to bring their duck collection into the 3D realm of photogrammetry and showcase them to other students!

[Ducks can be uploaded via the [DUX Studio](https://github.com/BertanT/DUXStudio) app after signing up for an account on this website!]


## Inspiration

Virtually every Stevens Student has a duck collection! In this day an age where Augmented Reality is so popular, why not bring these collections alive in the realm of ones and zeroes! From this silly idea, our project was born. We intended to create a way for Stevens students to share their collections with other members of the community and promote the Stevens spirit in the most lighthearted way possible!

## What it does

Our project, DUX (The Duck Experince) comes with an iOS photogrammetry app to 3D scan and transport your real-world ducks to a cute little web gallery. Every member of the Stevens community can sign up and show case their own!

The best part? Using AR QuickLook, YOU get to view and interact with other's collection pieces as if they were with you, in your own space! Just go to the web feed on your iPhone, and tap on the ducks' thumbnails!

In our little social media platform of ducks, we did not forget to add the ability to let you show some love! Pick your favorite ducks and tap away to add as many hearts you wish - up to the JavaScript integer limit :}

## How we built it

We used React with Next.js to create the website, where the users are able to create accounts, set profile pictures, and view every other person's ducks on the main feed. We are hosting it on bare metal, in a server set up in our dorm room reverse proxied through Cloudflare Tunnel!

The scanner app is built natively for iOS using SwiftUI. Incorporating the latest features of Apple's Vision and SceneKit frameworks, we are automatically capturing photos as the user walks their camera around their duck and stitching them together into a Pixar USDZ 3D model using an on-device photogrammetry pipeline - so no images of your personal living space or any data that could identify your location leaves your device.

Making up the backbone of the two products we built is Firebase Storage. It is responsible for the user creation and authentication workflows, as well as serving all of our models and their metadata as static resources!

### Challenges we ran into

The main challenge was that none of us had used Firebase before, so we had to figure out how to configure it and then link the database to both the website and the iOS app. The most challenging part about Firebase has certainly been permissions rulesets, it has been quite difficult to distinguish them between client-side errors.

Moreover, we ran into several database design issues where we had to re-plan the way we structure our data so that our app is scalable and is better organized.

There has also been some parts of the iOS app where we got stuck for longer than we would have liked, and without doubt, saying mentally sharp in a time-pressured environment in an extremely tired state has been the hardest one of all.

The AR QuickLook on the website works best on iOS and the app only works on iOS. We hope we'll be able to support more platforms in the future.

### Accomplishments that we're proud of

The accomplishment we were most proud of was the tight integration between the 3 main components of our project (iOS, React, Firebase). This fact combined with the way we produced two major products (the app and the website) in such time constraint was without doubt the most rewarding.

Speaking of the app, for some of our team members, being active in iPhone app development was extremely rewarding because when they started this hackathon, they had little to no experience with this area, but had a huge interest in it and did not know where to start.

### What we learned

All of us learned the basics of the Firebase database platform. Especially a deep delve into the permission rule configuration, as well as the Firebase CLI.

However, there were also members who learned specific tasks that others were experienced in. It has been a priceless opportunity to teach and learn from each other, while fostering our friendship through teamwork. Exploring our individual strengths and weaknesses, some of us were very familiar with JavaScript and React, while others knew app development and the Swift programming language.

### What's next for The Duck Experience (DUX)

Though its basic functionality is well-implemented; our project is still in its early stages. There are a lot of features that we had in mind, but no time to implement them up to our standards. Some of these features are,

* The friends system where users can prioritize their friends' posts to appear on their feed
* An extended profile that users can personalize and make them even more unique
* A 3D model viewer for the desktop gallery since right now, only the mobile site can show them
* a gallery feed in IOS app since right now its specific to the web app,
* Improvements in database for space optimizaiton and pagination for a better use of the resources
* On-device AI content moderation to validate models and make sure posts are only of rubber ducks
* Streamline UI design for a better user experience
* 2 factor authentication when logging in to harden security further.
* We would also love to implement any feedback given by the judges to make this project better. In the future, we hope, with the support of Student Life, to implement both the app and the website campus-wide. We feel
* * that is is just too cute to not do so! We also strongly believe that this helps promote the school spirit and our sense of community trough a distinct specimen of Stevens Culture

##  Object Capture Support
To run this app, you need an iPhone or iPad with the following:
- A LiDAR Scanner
- An A14 Bionic chip or later
- iOS or iPadOS 18 or later

## Build Notes
Make sure you are compiling for a hardware device plugged into Xcode. Trying to compile for an iOS simulator will fail as they miss the required SDKs.
