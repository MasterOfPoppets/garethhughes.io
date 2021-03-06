import React from 'react';
import Gist from '../../components/Gist.jsx';

const content = () => (
	<article>
		<p>
			When I began developing this site, I made the decision to use
			<a href="https://github.com/angular-ui/ui-router"> UI Router</a> for the client side routing, as opposed to
			ngRoute which is built-in to Angular.
		</p>
		<p>
			I made this decision because, despite the fact it is newer and therefore has issues, the benefits outweigh this.
			For example, I new that I wanted to create nested views as part of my portfolio page, and ngRoute just doesn't
			accomodate this.
		</p>
		<p>
			I also really prefer the idea of a 'state' within my app - this feels like it fits in a lot better with the MVC
			architecture, and I can map different states, often within the same page, to different controllers.
		</p>
		<p>
			Unfortunately, whilst developing my contact page, I came across one of the issues with UI Router, namely that it
			isn't possible to reload a controller. This was a problem for me because I wanted the animations that I had built
			into the page to run every time a user transitions from submitting the form to the success page. There are various
			workarounds on the UI Router github page for this issue, but these didn't appear to work for me, possibly because
			of the nested nature of the states in my app.
		</p>
		<p>
			In the end, I decided to take a look at the events that UI Router fires, and try to figure out how I could use
			them to my advantage. UI Router fires several events, including one that indicates a successful transition to a
			new state. Great! This is just what I need.
		</p>
		<Gist gist="MasterOfPoppets/7aae401839380403fd9e" />
		<p>
			When I first create my controller for handling the transition to the success page, I am registering a listener to
			the `$stateChangeSuccess` event. From that point, every time I receive an event of that type, I check that the
			current state is `contact.success` and if it is, execute my animation code. I have to check the current state,
			since every successful transition will fire this event, regardless which state it ends up in.
		</p>
		<p>
			I am fully expecting to encounter similar issues to this later on, when I introduce other animations to the app,
			and I am hoping that this approach to solving them is a good generic one.
		</p>
		<p>
			In other news, I have now also joined the Oxford Google Developer Group - another Meetup akin to Thames Valley Web
			Developers. There appears to be a considerable amount of overlap between the two at the moment, since they are
			both organised by the same person. However, with the first meeting this evening, I am hoping to get a bit more
			clarification about the aims of both groups, and if necessary, focus my attention on one of the groups.
		</p>
	</article>
);

export default content();
