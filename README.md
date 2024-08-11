# NOTES ON MY IMPLEMENTATION

# SEARCH ALGORITHM 

I have used a prefix search trie for my search algorithm, contained in utils/search.tsx.

I have chosen to do this because it brings the search time complexity to proportional to the search term length, although there is an increased time complexity for creating the search trie. This only happens when the page is initially rendered, so this is a reasonable tradeoff.

We might expect the titles and subtitles for each articles, as they are on the same topic, to contain some of the same words, which decreases the space required. Although for large numbers of articles this may still create a large search trie, getting subsets of large numbers of posts from the API at a time and getting more on user scrolling could create a solution in this case. The number of posts given in the challenge is small hence we do not face this issue.

The way that it is implemented at the moment allows the user to search for prefixes of words. Ideally the user should be able to search for multiple words, but unfortunately I ran out of time to implement this, although I would not expect the extension of the existing search trie would not be much more complicated.

# CRITICAL LOADING TIMES
The fetch method used in the utils/dataService.tsx functions automatically caches the return values of fetch, so that the data does not need to be fetched every time, decreasing waiting times for the user.

( https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating )

# KEEP FAVORITES AFTER RELOADING
I have used react context so that the favorite posts persist across reloads, the context is placed in the layout folder so wraps the entire application. 

# EMAIL VALIDATION
I have used regular expressions to validate the email address to improve user experience and ensure that the emails submitted to the database hold the structure of valid email addresses. 

# TESTS
Unfortunately I ran out of time to write tests for this web application, I will outline some of the tests I had planned on doing below:

I planned to use jest to test my web application, this is the testing framework I used in my internship last summer with react and typescript. 

Two of the non-standard tests that I planned on writing was checking that the favorite items appeared when filtered in the post list screen and ensuring that the search results only contained posts with valid prefixes. Additionally tests for the correct error message in the email input and when no posts are found would be needed.

For these tests I would need to mock the functions in the utils/dataService file

# OTHER EXTENSIONS

If I had more time I would have worked on formatting the text of the article, looking for places where it should be divided into paragraphs. I would have also improved the structure of the SCSS files, increasing the number of shared variables between the different files.

# legalNews
