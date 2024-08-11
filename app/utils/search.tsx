import { IndividualPost, Posts } from "@/types";

class TrieNode {
  character: string;
  isEndOfWord: boolean;
  children: Record<string, TrieNode>;
  posts: Set<IndividualPost>;

  constructor(character: string) {
    this.character = character;
    this.isEndOfWord = false;
    this.children = {};
    this.posts = new Set<IndividualPost>();
  }
}

function splitAndLowerCase(inputString: string): string[] {
  const words = inputString.split(" ");
  const lowerCaseWords = words.map((word) => word.toLowerCase());
  return lowerCaseWords;
}

export class Trie {
  root: TrieNode;
  allPosts: Set<IndividualPost>;

  constructor() {
    this.root = new TrieNode("");
    this.allPosts = new Set<IndividualPost>();
  }

  insert(word: string, post: IndividualPost) {
    const wordsInTitle = splitAndLowerCase(word);
    wordsInTitle.forEach((word) => this.insertWord(word, post));
  }

  private insertWord(word: string, post: IndividualPost) {
    let node = this.root;
    this.allPosts.add(post);

    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode(char);
      }
      node = node.children[char];
    }

    node.isEndOfWord = true;
    node.posts.add(post); // Associate the post with the word
  }

  search(prefix: string): Posts {
    if (!prefix) {
      return Array.from(this.allPosts);
    }
    console.log("search called with prefix " + prefix);

    const results: Set<IndividualPost> = new Set();
    let node = this.root;

    for (const char of prefix) {
      if (!node.children[char]) {
        return Array.from(results);
      }
      node = node.children[char];
    }

    return Array.from(this.collectPosts(node, results));
  }

  private collectPosts(
    node: TrieNode,
    results: Set<IndividualPost>
  ): Set<IndividualPost> {
    if (node.isEndOfWord && node.posts) {
      results = new Set([...results, ...node.posts]);
    }

    // If the node has children then for each child collect the posts
    for (const char in node.children) {
      if (Object.prototype.hasOwnProperty.call(node.children, char)) {
        results = new Set([
          ...results,
          ...this.collectPosts(node.children[char], results),
        ]);
      }
    }
    return results;
  }
}
