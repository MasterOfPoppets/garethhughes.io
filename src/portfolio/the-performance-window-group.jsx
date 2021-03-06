import React from 'react';

const content = () => (
	<article>
		<h3>The challenge</h3>
		<p>
			The Performance Window Group (PWG) make timber windows and doors for both private customers and trade dealers.
		</p>
		<p>
			Their long-term vision was to rejuvenate their legacy quoting tool, "Aperture", whilst fulfilling a number of
			requirements along the way, including:
		</p>
		<ul>
			<li>Improve the ability to make timely changes to the system</li>
			<li>Provide better support for mobile devices, particularly tablets</li>
		</ul>
		<p>
			With Aperture starting life written in jQuery hooked up to a Perl back-end, the development team took some time to
			analyse the various frameworks available and made a decision to switch to using Angular - bringing Quantum Web
			Development on board to facilitate this transition.
		</p>
		<h3>The solution</h3>
		<p>
			By using Angular to create a library of reusable, generic components and a framework to interact with the server we were
			able to move the product away from the very un-<a href="https://en.wikipedia.org/wiki/Don't_repeat_yourself">DRY</a> approach that
			had been taken previously.
		</p>
		<p>
			Integrating tools such as Gulp, ESLint and Wallaby into the development process allowed us to reduce the rampant code
			duplication and cut down on the number of errors and unprofessional javascript. Encouraging test-driven development also
			allowed us to help the team to create more robust and reusable code than before.
		</p>
		<p>
			Finally, by creating a dedicated new server, written in Node, for all the previously disparately located business rules,
			we were able to quickly increase the level of professionalism in the team's javascript. This ultimately benefit the
			front-end development as well - by giving the team a better understanding of good design practices that Angular
			encourages.
		</p>
		<hr />
		<h3>Adopting Angular</h3>
		<p>
			Two challenges presented themselves almost immediately. Firstly, the team lacked much appreciation for user experience,
			especially with regard to the system being used on mobile devices. Secondly, the existing system was full to bursting of
			code duplication. A great example of how we tackled both of these challenges was the overhaul of a widget best described
			as Frankenstein's monster - the colour selector!
		</p>
		<img src="http://res.cloudinary.com/gurrkin/image/upload/v1450621557/portfolio/pwg/frankenselector.png" alt="PWG Colour Selector" className="img-responsive img-half center-block" />
		<p>
			The user was presented with a select box of approximately 200 colour options. Each colour option also featured a swatch
			loaded via a round trip to the server. The final two options in this select box were a pair of search fields that
			allowed the user to search alternate colour ranges and choose a colour from them - this time without the aid of a swatch.
		</p>
		<p>
			By introducing Bootstrap to the technology stack we were able to use it in conjunction with Angular to create a new
			directive that would provide a vastly improved, mobile-first, user experience. In addition, by using Angular to create a
			small library of components, we were able to encourage the team to think in a more abstract and DRY.
			way.
		</p>
		<img src="http://res.cloudinary.com/gurrkin/image/upload/v1450619051/portfolio/pwg/colours.png" alt="PWG Colour Selector" className="img-responsive" />
		<p>
			We were able to further improve the user experience and the overall consistency of the application by adding an optional
			search field to all similar components.
		</p>
		<h3>Broken business logic</h3>
		<p>
			The USP of the existing Aperture application was its product rendering engine. As a quote was modified by the user, the
			engine would be called to keep the image up to date according to the various options chosen. This was important as it
			gave customers the ability to get a good idea of what their product would look like, but also for the factory that made
			the products - these drawings formed the technical blueprint of what would actually be made.
		</p>
		<img src="http://res.cloudinary.com/gurrkin/image/upload/v1450781294/portfolio/pwg/sash_window.png" alt="PWG Sash Window Drawing" className="img-responsive img-half center-block" />
		<p>
			Performance wise it left a lot to be desired.
		</p>
		<p>
			With little regard for asynchronicity, the existing drawing was sometimes updated multiple times for a single user
			interaction due to the chain of effects that a particular change might have.
		</p>
		<p>
			Additionally, the level of code duplication within in the business logic (itself spread over both the front-end and
			server) and the fragility of this existing javascript gave rise to the number one goal - making timely changes to the
			system.
		</p>
		<p>
			Something drastic was needed.
		</p>
		<h3>Welcome to the (state) machine</h3>
		<p>
			Our solution to these problems was to create a single source of truth for the buisness rules. Any proposed change to the
			current product would be sent to this "State machine" which would be solely responsible for calculating any new side
			effects and updating the application based on these.
		</p>
		<p>
			This would be entirely implemented on a new server - written in Node.
		</p>
		<p>
			By choosing to write this business rules server in Node, we were able to immerse the development team in Javascript like
			never before - although there was a lot of legacy code written in javascript/jQuery, none of it could be described as
			professional.
		</p>
	</article>
);

export default content();
