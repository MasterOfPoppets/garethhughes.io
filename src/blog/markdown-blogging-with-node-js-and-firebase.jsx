import React from 'react';
import Gist from '../../components/Gist.jsx';

const content = () => (
	<article>
		<p>
			For the majority of this week I have been focusing on adding a rudimentary blogging engine to my site, allowing me
			to post updates such as this.
		</p>
		<p>
			There are many different options out there for blogging, from small but powerful Node.js modules such as
			<a href="https://github.com/creationix/wheat"> Wheat</a> to plugin heavy behemoths like Wordpress. However, since
			developing this site has partly been a learning exercise, I thought I would have a go at developing my own
			blogging engine - one that would allow me to customise to my own requirements as I went along.
		</p>
		<p>So where to start?</p>
		<h3>Phase 1: A content directory</h3>
		<p>
			First of all, I thought my site would contain a structured <code>content</code> folder along the lines of this:
		</p>
		<Gist gist="MasterOfPoppets/19199cef41a1145bdf87" file="content-directory.txt" />
		<p>
			Each post would be in its own separate folder, corresponding to the link address on the site. This folder would
			contain a `post.json` file containing some metadata such as title and date, and `post.markdown`. This file would
			contain the actual post and be written using <a href="http://daringfireball.net/projects/markdown/">Markdown</a>,
			allowing me	to intuitively write posts that get rendered into beautiful HTML.
		</p>
		<p>
			This first approach ended up being quite easy - firstly get Node to read the folder structure when you first hit
			the blog page, and generate a nice list of "links" to pass to the Jade template. Clicking on a link would then
			render a new Jade template with the specific post content in.
		</p>
		<p>
			Great - but theres a problem. At the moment my site is deployed on <a href="https://www.heroku.com/">Heroku </a>
			meaning that any content update would require a git push and restarting of the app. So the next step, take what
			I've learnt but extract the content to somewhere else.
		</p>
		<h3>Phase 2: Remote content</h3>
		<p>
			In using a remote location for my content, my thoughts first turned to Wheat, and storing the content in a file
			structure as before, but in a seperate Git repository. However, lately I have been playing around with
			<a href="https://www.firebase.com"> Firebase</a>, and so I decided to have a bit of fun with that instead. It also
			allows much more flexibility - allowing me to post new content virtually anywhere.
		</p>
		<p>Expanding the data structure from my first attempt, my Firebase now looks something a little like this:</p>
		<Gist gist="MasterOfPoppets/19199cef41a1145bdf87" file="remote-content.txt" />
		<p>
			Each new entry is added to the <code>blogEntries</code> child, keeping it nicely organised and allowing the use of
			specific security rules. The entry is keyed by its URL, mainly for readability purposes at the moment, but it may
			be handy later on. Each entry again contains things like date, title and the actual post, again written in
			Markdown. It also features a new <code>stub</code> - which will be used as a short summary when viewing all the
			blog entries before choosing one to drill into. This again is written in Markdown.
		</p>
		<p>
			Now when a user visits the blog page, Node starts up a Firebase <code>child_added</code> listener, populating the
			list of current blog entries, and then sticks them into the existing <code>blog.jade</code> template.
		</p>
		<p>Drilling down into a particular blog post does a similar thing, except it registers...</p>
		<Gist gist="MasterOfPoppets/19199cef41a1145bdf87" file="once.js" />
		<p>
			on the particular child entry being viewed - after all, we are only interested in getting the entry once! This is
			then placed into the existing <code>blogEntry.jade</code>.
		</p>
		<h3>Phase 3: Content management</h3>
		<p>
			Now that my Firebase was in place and ready to be used by the site, I needed a nicer way of actually writing the
			data, as opposed to directly modifying it through the Firebase UI. I wanted to write my posts in Markdown, edit
			the post metadata and then have them sent directly to Firebase.
		</p>
		<p>Enter <a href="https://github.com/MasterOfPoppets/blog-post-author">blog-post-author</a>.</p>
		<p>
			This is currently a simple program, again written with Node.js, that basically scans a <code>content</code> folder
			for three files: <code>post.json</code>, <code>post.markdown</code> and <code>stub.markdown</code>. Once it has
			these it fires off a <code>setWithPrioriy</code> call to Firebase using
			<code>Firebase.ServerValue.TIMESTAMP</code>, allowing me to order my posts chronologically.
		</p>
		<p>
			Currently this program is very basic - editing data essentially involves ensuring the URL in the
			<code>post.json</code> file is the same. Going back and editing more historical entries would definitely prove
			more annoying. However, the program does what I want to do, and I already have some great ideas of how to expand
			it!
		</p>
		<h3>Phase 4: The future is... Angular</h3>
		<p>
			Currently this is all being done on the server-side by Node. However, Firebase excels at running entirely on the
			client-side, so my next step with the blogging on this site is to move entirely to using AngularJS - in fact the
			only thing that will remain will be that my Node server will serve Jade templates as before, though these will be
			modified to use Angular directives instead of being passed in Jade variables.
		</p>
		<p>
			I also want to work on the blog-post-author project a bit, making it a bit more user friendly. I have a volunteer
			client who will be using this to post blog entries to the site we are developing and anything that makes his life
			easier is going to be great.
		</p>
		<p>Watch this space...!</p>
	</article>
);

export default content();
