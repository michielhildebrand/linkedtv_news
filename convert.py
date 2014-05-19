#!/Library/Frameworks/Python.framework/Versions/2.7/bin/python

import argparse
import json, urllib2
from newspaper import Article

def main():
    parser = argparse.ArgumentParser(description='This is a demo script by nixCraft.')
    parser.add_argument('-i','--input', help='Input file name',required=True)
    parser.add_argument('-o','--output',help='Output file name', required=True)
    args = parser.parse_args()

    json_data = open(args.input)
    data = json.load(json_data)
    new_data = articleData(data)
    json_data.close()
    
    with open(args.output, 'w') as out:
        json.dump(new_data, out, indent=4, separators=(',', ': '))
    
    
def articleData(data):
    new_data = []
    
    # loop through each article
    for article in data:
        url = article["url"]
        print ("processing %s" % url)
        
        a = Article(url=url, keep_article_html=True)
        a.download()
        try:
            a.parse() # FIXME this can fail
    
            # newspaper gives us some news stuff
    
            text = a.article_html
            title = a.title
            image = a.top_image
            movies = a.movies
            authors = a.authors
            
            article_data = {
                "url":url,
                "title":title,
                "text":text
            }  
    
            if authors:
                article_data["author"] = {
                    "name": authors[0]
                }
                author_image = fetchImage(authors[0], 'medium')
                if author_image:
                    article_data["author"]["thumb"] = author_image  
        
            # media
            if movies:
                article_data["media"] = {
                    "url": movies[0],
                    "type": "video"
                }
            elif image:
                article_data["media"] = {
                    "url": image,
                    "type": "image"
                }

            # some stuff newspaper does not get, but we might already had in the original source

            if "date" in article:
                article_data["date"] = article["date"]
    
            if "source" in article:
                if "name" in article["source"]:
                    name = article["source"]["name"]
                    article_data["source"] = {
                        "name": name
                    }
                    source_image = fetchImage(name, 'icon')
                    if source_image:
                        article_data["source"]["thumb"] = source_image

            if article_data["text"] and article_data["title"] and ( article_data["source"] or article_data["author"] ):
                new_data.append(article_data)
        
        except Exception:
            print "parse error"    
        
    return new_data
    

def fetchImage(q,size):
    url = ('https://ajax.googleapis.com/ajax/services/search/images?' + 'v=1.0&q=' + urllib2.quote(q) + '&imgsz=' + size)
    request = urllib2.Request(url)
    response = urllib2.urlopen(request)
    results = json.load(response)
    if results["responseData"]["results"]:
        return results["responseData"]["results"][0]["url"]


main()