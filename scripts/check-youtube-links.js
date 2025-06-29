const fs = require('fs')
const path = require('path')

// Read the current tracklist
const tracklistPath = path.join(__dirname, '../src/assets/data/tracklist.json')
const tracklist = JSON.parse(fs.readFileSync(tracklistPath, 'utf8'))

console.log('Checking YouTube links...\n')

async function checkYouTubeLink(url) {
  try {
    // Extract video ID from YouTube URL
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    if (!videoIdMatch) {
      console.log(`❌ Invalid YouTube URL format: ${url}`)
      return false
    }
    
    const videoId = videoIdMatch[1]
    
    // Use YouTube oEmbed API to check if video exists
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    
    const response = await fetch(oembedUrl)
    
    if (response.ok) {
      const data = await response.json()
      console.log(`✅ Working: ${data.title}`)
      return true
    } else {
      console.log(`❌ Broken: ${url} (Status: ${response.status})`)
      return false
    }
  } catch (error) {
    console.log(`❌ Error checking ${url}: ${error.message}`)
    return false
  }
}

async function checkAllLinks() {
  const workingTracks = []
  
  for (let i = 0; i < tracklist.length; i++) {
    const track = tracklist[i]
    console.log(`Checking ${i + 1}/${tracklist.length}: ${track.title}`)
    
    const isWorking = await checkYouTubeLink(track.url)
    
    if (isWorking) {
      workingTracks.push(track)
    }
    
    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  
  console.log(`\n📊 Results:`)
  console.log(`Total tracks: ${tracklist.length}`)
  console.log(`Working tracks: ${workingTracks.length}`)
  console.log(`Broken tracks: ${tracklist.length - workingTracks.length}`)
  
  if (workingTracks.length !== tracklist.length) {
    // Update the tracklist file with only working links
    fs.writeFileSync(tracklistPath, JSON.stringify(workingTracks, null, 2))
    console.log(`\n✅ Updated tracklist.json with ${workingTracks.length} working tracks`)
  } else {
    console.log(`\n✅ All tracks are working - no changes needed`)
  }
}

checkAllLinks().catch(console.error)