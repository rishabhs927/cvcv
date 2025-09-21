"use client";

import React, { useMemo, useEffect, useState, useRef, useCallback } from 'react';
import { combineCollections, RichText } from 'readcv';
import { motion, useSpring, useTransform, useAnimate, AnimatePresence } from 'framer-motion';
import {useSwipeable} from 'react-swipeable'

// Function to shuffle array randomly
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Import flipbook data
const flipbookData = {
  "general": {
    "profilePhoto": "/content/flipbook/media/profilePhoto.jpg",
    "username": "r1sh",
    "displayName": "/content/flipbook/media/kaam.jpg",
    "profession": null,
    "location": "Mumbai, India",
    "pronouns": "He/Him",
    "byline": "Homegrown, in Mumbai, India",
    "website": null,
    "websiteURL": null,
    "about": null,
    "status": {
      "text": null,
      "emoji": null,
      "timestamp": null
    },
    "sectionOrder": null
  },
  "projects": [
    {
      "id": "tQc0zK2x05aqoPFaXRsZ",
      "year": "2024",
      "heading": "Logo Design",
      "url": "https://www.instagram.com/nebofetehouse/",
      "collaborators": [],
      "description": "",
      "attachments": [
        {
          "type": "image",
          "width": 1000,
          "height": 1000,
          "url": "/content/flipbook/media/Logo-Designer-at-Nebo-1.png"
        },
        {
          "type": "image",
          "width": 1904,
          "height": 1370,
          "url": "/content/flipbook/media/Logo-Designer-at-Nebo-2.png"
        },
        {
          "type": "image",
          "width": 2422,
          "height": 1372,
          "url": "/content/flipbook/media/Logo-Designer-at-Nebo-3.png"
        },
        {
          "type": "image",
          "width": 3600,
          "height": 2400,
          "url": "/content/flipbook/media/Logo-Designer-at-Nebo-4.png"
        }
      ],
      "type": "project",
      "title": "Logo Design",
      "company": ""
    },
    {
      "id": "hYCncRnYs7CwEJ9nFt5w",
      "year": "2023",
      "heading": "Pitchdeck for Amazon Prime",
      "url": null,
      "collaborators": [],
      "description": "",
      "attachments": [
        {
          "type": "image",
          "width": 1920,
          "height": 1080,
          "url": "/content/flipbook/media/Pitch-Deck-Designer-at-Beardman-Films-1.jpg"
        },
        {
          "type": "image",
          "width": 1920,
          "height": 1080,
          "url": "/content/flipbook/media/Pitch-Deck-Designer-at-Beardman-Films-2.jpg"
        },
        {
          "type": "image",
          "width": 1920,
          "height": 1080,
          "url": "/content/flipbook/media/Pitch-Deck-Designer-at-Beardman-Films-3.jpg"
        },
        {
          "type": "image",
          "width": 605,
          "height": 743,
          "url": "/content/flipbook/media/Pitch-Deck-Designer-at-Beardman-Films-4.jpg"
        },
        {
          "type": "image",
          "width": 1920,
          "height": 1080,
          "url": "/content/flipbook/media/Pitch-Deck-Designer-at-Beardman-Films-5.jpg"
        },
        {
          "type": "image",
          "width": 1918,
          "height": 1079,
          "url": "/content/flipbook/media/Pitch-Deck-Designer-at-Beardman-Films-6.jpg"
        },
        {
          "type": "image",
          "width": 1920,
          "height": 1080,
          "url": "/content/flipbook/media/Pitch-Deck-Designer-at-Beardman-Films-7.jpg"
        },
        {
          "type": "image",
          "width": 1920,
          "height": 1080,
          "url": "/content/flipbook/media/Pitch-Deck-Designer-at-Beardman-Films-8.jpg"
        }
      ],
      "type": "project",
      "title": "Branding",
      "company": ""
    },
    {
      "id": "business-cards-section",
      "year": "2024-2025",
      "heading": "Business Cards Design",
      "url": null,
      "collaborators": [],
      "description": "Professional business card designs for various clients and brands",
      "attachments": [
        {
          "type": "image",
          "width": 1920,
          "height": 1080,
          "url": "/content/flipbookdata/buisness cards/bizzcard_kalratri.png"
        },
        {
          "type": "image",
          "width": 1920,
          "height": 1080,
          "url": "/content/flipbookdata/buisness cards/bizzcards_pushpak.png"
        },
        {
          "type": "image",
          "width": 1920,
          "height": 1080,
          "url": "/content/flipbookdata/buisness cards/WhatsApp Image 2025-03-20 at 13.23.19.jpeg"
        }
      ],
      "type": "project",
      "title": "Business Cards Design",
      "company": ""
    },
    {
      "id": "vCzeZzJDVqHiVpC9jgsM",
      "year": "2023",
      "heading": "Social Media",
      "url": null,
      "collaborators": [],
      "description": "",
      "attachments": shuffleArray([
        {
          "type": "image",
          "width": 1080,
          "height": 1350,
          "url": "/content/flipbook/media/Social-Media-Designer-at-Hades-Group-1.jpg"
        },
        {
          "type": "image",
          "width": 1080,
          "height": 1920,
          "url": "/content/flipbook/media/Social-Media-Designer-at-Hades-Group-2.jpg"
        },
        {
          "type": "image",
          "width": 1080,
          "height": 1350,
          "url": "/content/flipbook/media/Social-Media-Designer-at-Hades-Group-3.jpg"
        },
        {
          "type": "image",
          "width": 3112,
          "height": 4000,
          "url": "/content/flipbook/media/Social-Media-Designer-at-Hades-Group-4.jpg"
        },
        {
          "type": "image",
          "width": 1920,
          "height": 1080,
          "url": "/content/flipbookdata/social_media/1.png"
        },
        {
          "type": "image",
          "width": 1920,
          "height": 1080,
          "url": "/content/flipbookdata/social_media/2.png"
        },
        {
          "type": "image",
          "width": 1920,
          "height": 1080,
          "url": "/content/flipbookdata/social_media/3.png"
        }
      ]),
      "type": "project",
      "title": "Social Media",
      "company": ""
    }
  ],
  "sideProjects": [
    {
      "id": "HzxQIRlk1EaqdS0xp3D8",
      "year": "Ongoing",
      "heading": "Brutalist Prints",
      "url": null,
      "collaborators": [],
      "description": "",
      "attachments": [
        {
          "type": "image",
          "width": 564,
          "height": 846,
          "url": "/content/flipbook/media/Fun-Stuff-1.jpg"
        },
        {
          "type": "image",
          "width": 768,
          "height": 1000,
          "url": "/content/flipbook/media/Fun-Stuff-2.jpg"
        },
        {
          "type": "image",
          "width": 810,
          "height": 1080,
          "url": "/content/flipbook/media/Fun-Stuff-3.jpg"
        },
        {
          "type": "image",
          "width": 1156,
          "height": 1542,
          "url": "/content/flipbook/media/Fun-Stuff-4.jpg"
        },
        {
          "type": "image",
          "width": 1156,
          "height": 1156,
          "url": "/content/flipbook/media/Fun-Stuff-5.jpg"
        },
        {
          "type": "image",
          "width": 940,
          "height": 1671,
          "url": "/content/flipbook/media/Fun-Stuff-6.jpg"
        },
        {
          "type": "image",
          "width": 1156,
          "height": 1593,
          "url": "/content/flipbook/media/Fun-Stuff-7.jpg"
        },
        {
          "type": "image",
          "width": 1136,
          "height": 1671,
          "url": "/content/flipbook/media/Fun-Stuff-8.jpg"
        }
      ],
      "type": "sideProject",
      "title": "Brutalist Prints",
      "company": ""
    },
    {
      "id": "ghSLQplGzuGYU6rE0sZx",
      "year": "2025",
      "heading": "Shot on iPhone/Photography",
      "url": "https://www.cosmos.so/r1shabh/(this-is)-real.life1",
      "collaborators": [],
      "description": "shot on iPhone",
      "attachments": [
        {
          "type": "image",
          "width": 1448,
          "height": 2172,
          "url": "/content/flipbook/media/Photography-1.jpg"
        },
        {
          "type": "image",
          "width": 1500,
          "height": 2000,
          "url": "/content/flipbook/media/Photography-2.jpg"
        },
        {
          "type": "image",
          "width": 1448,
          "height": 2172,
          "url": "/content/flipbook/media/Photography-3.jpg"
        },
        {
          "type": "image",
          "width": 1536,
          "height": 2048,
          "url": "/content/flipbook/media/Photography-4.jpg"
        },
        {
          "type": "image",
          "width": 2000,
          "height": 1333,
          "url": "/content/flipbook/media/Photography-5.jpg"
        },
        {
          "type": "image",
          "width": 1333,
          "height": 2000,
          "url": "/content/flipbook/media/Photography-6.jpg"
        },
        {
          "type": "image",
          "width": 2000,
          "height": 1333,
          "url": "/content/flipbook/media/Photography-7.jpg"
        },
        {
          "type": "image",
          "width": 1448,
          "height": 2172,
          "url": "/content/flipbook/media/Photography-8.jpg"
        },
        {
          "type": "image",
          "width": 1125,
          "height": 2000,
          "url": "/content/flipbook/media/Photography-9.jpg"
        },
        {
          "type": "image",
          "width": 1512,
          "height": 2016,
          "url": "/content/flipbook/media/Photography-10.jpg"
        }
      ],
      "type": "sideProject",
      "title": "Shot on iPhone/Photography",
      "company": ""
    },
    {
      "id": "c6yn6U9DXJflscpMRUOe",
      "year": "2025",
      "heading": "Event Posters",
      "url": null,
      "collaborators": [],
      "description": "",
      "attachments": shuffleArray([
        {
          "type": "image",
          "width": 2060,
          "height": 3659,
          "url": "/content/flipbook/media/Club-Posters-1.jpg"
        },
        {
          "type": "image",
          "width": 2626,
          "height": 3376,
          "url": "/content/flipbook/media/Club-Posters-2.jpg"
        },
        {
          "type": "image",
          "width": 1080,
          "height": 1920,
          "url": "/content/flipbook/media/Club-Posters-3.png"
        },
        {
          "type": "image",
          "width": 1080,
          "height": 1920,
          "url": "/content/flipbook/media/Club-Posters-4.jpg"
        },
        {
          "type": "image",
          "width": 2475,
          "height": 4400,
          "url": "/content/flipbook/media/Club-Posters-5.jpg"
        },
        {
          "type": "image",
          "width": 939,
          "height": 1671,
          "url": "/content/flipbook/media/Club-Posters-6.jpg"
        },
        {
          "type": "image",
          "width": 940,
          "height": 1671,
          "url": "/content/flipbook/media/Club-Posters-7.jpg"
        },
        {
          "type": "image",
          "width": 1080,
          "height": 1920,
          "url": "/content/flipbook/media/Club-Posters-8.png"
        },
        {
          "type": "image",
          "width": 1920,
          "height": 1080,
          "url": "/content/flipbookdata/club_posters/27 Feb_SC_BE_1.png"
        },
        {
          "type": "image",
          "width": 1920,
          "height": 1080,
          "url": "/content/flipbookdata/club_posters/gg.png"
        },
        {
          "type": "image",
          "width": 1920,
          "height": 1080,
          "url": "/content/flipbookdata/club_posters/Lehar_BE_8.png"
        },
        {
          "type": "image",
          "width": 1920,
          "height": 1080,
          "url": "/content/flipbookdata/club_posters/Poster Portrait.png"
        },
        {
          "type": "image",
          "width": 1920,
          "height": 1080,
          "url": "/content/flipbookdata/club_posters/thalassa (1).png"
        }
      ]),
      "type": "sideProject",
      "title": "Event Posters",
      "company": ""
    }
  ],
  "workExperience": [
    {
      "id": "LtOKMdDD3Hvptckqrah0",
      "year": "2023 — Now",
      "heading": "Creative Director at T-rex Media",
      "url": "https://www.trexmedia.in",
      "collaborators": [],
      "description": "",
      "attachments": [],
      "type": "workExperience",
      "title": "Creative Director",
      "company": "T-rex Media",
      "location": "Mumbai"
    }
  ],
  "contact": [
    {
      "id": "yzSsDaJrTbnA92OZeRNa",
      "platform": "Linkedin",
      "handle": "Rishabh Sharma",
      "url": "http://www.linkedin.com/in/rishabh-sharma-6542052b1"
    },
    {
      "id": "4YHopQjmrchCup8TAtjF",
      "platform": "Instagram",
      "handle": "r1shabh27",
      "url": "https://instagram.com/r1shabh27"
    },
    {
      "id": "c3og4nZrLvmMMYPn2UYm",
      "platform": "Cosmos",
      "handle": "r1shabh",
      "url": "https://www.cosmos.so/r1shabh/(this-is)-real.life1"
    },
    {
      "id": "CPGm1ZowwLDg8o6JN5MJ",
      "platform": "Email",
      "handle": "srishabh1105@gmail.com",
      "url": "mailto:srishabh1105@gmail.com"
    }
  ]
};

// some shared properties between components
const paperAnim = {type:'spring', bounce:0.05}
const noAnim = {duration:0}
const paperPadding = '3vw'
const mobilePaperPadding = '3vh'
const defaultPaletteSize = 24
const mobilePaletteSize = 8
const toggleShadow = true // make this false to toggle off realistic shadow effect

function Flipbook() {
  const isDesktop = useDesktopDetect();
  const [current, setCurrent] = useState(0);

  const [swipe, setSwipe] = useState("");
  const config = {
    delta: 10, // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: true, // prevents scroll during swipe (*See Details*)
    trackTouch: true, // track touch input
    trackMouse: false, // track mouse input
    rotationAngle: 0, // set a rotation angle
    swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
  };

  
  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      if (isDesktop === false) {
        setSwipe("left");
      }
    },
    onSwipedRight: (eventData) => {
      if (isDesktop === false) {
        setSwipe("right");
      }
    },
    ...config,
  });

 const projects = combineCollections(
    flipbookData.projects,
    flipbookData.workExperience,
    flipbookData.sideProjects,
  ).filter((x) => x.attachments.length > 0);

 const [allColorsReady, setAllColorsReady] = useState(false);
  
  return (
    <div style={{ 
      background: "black", 
      width:'100%', 
      height: '100%', 
      display:'flex', 
      flexDirection:'column', 
      justifyContent: isDesktop === true? 'flex-start': 'center', 
      alignItems: isDesktop === true? 'center':'flex-start', 
      overflowY: isDesktop === true?'auto':'hidden',
      overflowX: 'hidden',
      position: 'relative'
    }} {...handlers}>
      {/* Loading Spinner */}
      <AnimatePresence>
        {!allColorsReady && (
          <LoadingSpinner />
        )}
      </AnimatePresence>
      
      <ColorPapers swipe={swipe} setSwipe={setSwipe} current={current} setCurrent={setCurrent} projects={projects} allColorsReady={allColorsReady} setAllColorsReady={setAllColorsReady} cv={flipbookData}/>
      {isDesktop === true && allColorsReady && (
        <div style={{
          position: 'fixed',
          right: 30,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
          zIndex: 1000
        }}>
          {/* Up/Previous Button */}
          <motion.button 
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            whileHover={{ scale: current > 0 ? 1.1 : 1, y: current > 0 ? -2 : 0 }}
            whileTap={{ scale: current > 0 ? 0.95 : 1 }}
            style={{
              width: 50,
              height: 50,
              background: current > 0 
                ? 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,240,240,0.9))' 
                : 'rgba(255,255,255,0.3)',
              border: current > 0 ? '2px solid rgba(0,0,0,0.1)' : '2px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              cursor: current > 0 ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: current > 0 ? '#333' : 'rgba(255,255,255,0.5)',
              boxShadow: current > 0 
                ? '0 4px 15px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)' 
                : 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
          >
            ↑
          </motion.button>

          {/* Page Counter */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              padding: '8px 12px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,240,240,0.9))',
              border: '2px solid rgba(0,0,0,0.1)',
              borderRadius: 25,
              fontSize: '12px',
              fontWeight: '600',
              color: '#333',
              textAlign: 'center',
              minWidth: 50,
              boxShadow: '0 4px 15px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
          >
            {current}/{projects.length}
          </motion.div>

          {/* Down/Next Button */}
          <motion.button 
            onClick={() => setCurrent(Math.min(projects.length, current + 1))}
            disabled={current >= projects.length}
            whileHover={{ scale: current < projects.length ? 1.1 : 1, y: current < projects.length ? 2 : 0 }}
            whileTap={{ scale: current < projects.length ? 0.95 : 1 }}
            style={{
              width: 50,
              height: 50,
              background: current < projects.length 
                ? 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,240,240,0.9))' 
                : 'rgba(255,255,255,0.3)',
              border: current < projects.length ? '2px solid rgba(0,0,0,0.1)' : '2px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              cursor: current < projects.length ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: current < projects.length ? '#333' : 'rgba(255,255,255,0.5)',
              boxShadow: current < projects.length 
                ? '0 4px 15px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)' 
                : 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
          >
            ↓
          </motion.button>
        </div>
      )}
      {isDesktop === true && <Footer cv={flipbookData} />}
    </div>
  );
}


function ColorPapers({ swipe, setSwipe, current, setCurrent, projects, allColorsReady, setAllColorsReady, cv }) {

  
  const [attachments, setAttachments] = useState([]);
  const [paletteSize, setPaletteSize] = useState(4);
 
  
  const colorReadyCount = useRef(0);

  useEffect(() => {
    projects.forEach((project) => {
      let link = project.url;
      project.attachments.forEach((attachment) => {
        let newAttachment = attachment;
        if (link) {
          newAttachment.link = link;
        }
        setAttachments((attachments) => [...attachments, newAttachment]);
      });
    });
  }, []);

  const handleSwipe = async () => {
    if (swipe === "right" && current > 0 && isDesktop === false && allColorsReady === true) {
      await setCurrent(current - 1);
      setSwipe("");
    } else if (
      swipe === "left" &&
      isDesktop === false && allColorsReady === true
    ) {
      await setCurrent(current + 1);
      setSwipe("");
    } else if (
      swipe === "left" &&
      current === projects.length &&
      isDesktop === false && allColorsReady === true
    ) {
      await setCurrent(0);
      setSwipe("");
    }
  };

  useEffect(() => {
    handleSwipe();
  }, [swipe, allColorsReady]);

    const isDesktop = useDesktopDetect();

  const handleColorReady = useCallback(() => {
    colorReadyCount.current += 1;
    if (colorReadyCount.current === projects.length) {
      setAllColorsReady(true);
    }
  }, [projects.length]);

  useEffect(() => {
    if (allColorsReady === true && isDesktop === true) {
      setPaletteSize(defaultPaletteSize);
    } else if (allColorsReady === true && isDesktop === false) {
      setPaletteSize(mobilePaletteSize);
    }
  }, [allColorsReady, isDesktop]);

  const totalRotations = Math.floor(current / (projects.length+1));
    const currentIndex = current % (projects.length+1);
  return (
    <motion.div
      style={{
        perspective: 2800,
        position: "fixed",
        width:
          isDesktop === true
            ? `calc(100% - ${paperPadding} * 2)`
            : `calc(100% - ${mobilePaperPadding})`,
        height:
          isDesktop === true
            ? `calc(100% - ${paperPadding})`
            : `calc(100% - ${mobilePaperPadding} * 2)`,
        overflow: "visible",
        zIndex:10
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: allColorsReady ? 1 : 0
      }}
      transition={{ 
        duration: 0.5, 
        delay: allColorsReady ? 0.3 : 0 
      }}
    >
            <motion.div 
              // shadow
              style={{
     height:
            isDesktop === true
              ? `calc(100% - ${paperPadding} - ${projects.length * paletteSize}px)`
              : "100%",
          width:
            isDesktop === true
              ? "100%"
              : `calc(100% - ${projects.length * paletteSize}px)`,
          position: "absolute",
           display:allColorsReady === true && toggleShadow === true ? 'block' :'none',
        top: 0,
        originX: 0,
        originY: 0,
      background:'rgba(0,0,0,0.4)',
    pointerEvents:'none'
      }} 
        initial={{opacity:0}}
        animate={{
          zIndex: projects.length + 1,
        skewX:  current > 0 && isDesktop === true ?  30 : 0,
          skewY:  currentIndex > 0 && isDesktop === false ?  50 : 0,
          opacity:  (current > 0 && isDesktop === true) || (currentIndex > 0 && isDesktop === false)?  0 :1,
          filter: (current > 0 && isDesktop === true ) || (currentIndex > 0 && isDesktop === false)?  'blur(10px)' :'blur(0px)',
      
      }}

         transition={paperAnim}
        ></motion.div>
      <motion.div
        className="paper"
        style={{
          zIndex: projects.length + 1,
          display: "flex",
          padding: 24,
          originX: 0,
          originY: 0,
          position: "absolute",
          overflow: "visible",
        }}
        initial={{
          height:
            isDesktop === true
              ? `calc(100% - ${paperPadding} - ${projects.length * paletteSize}px)`
              : "100%",
          width:
            isDesktop === true
              ? "100%"
              : `calc(100% - ${projects.length * paletteSize}px)`,
        }}
        animate={{
          width:
            isDesktop === true
              ? "100%"
              : `calc(100% - ${projects.length * paletteSize}px)`,
          background: "white",
          rotateX: current > 0 && isDesktop === true ? 90 : 0,
          rotateY : currentIndex> 0 && isDesktop === false? -90 + -360 * totalRotations: 0 - 360 * totalRotations,
          height:
            isDesktop === true
              ? `calc(100% - ${paperPadding} - ${projects.length * paletteSize}px)`
              : "100%",
        }}
        transition={{
          width: { duration: isDesktop === true ? 0 : 0.3 },
          height: { duration: isDesktop === false ? 0 : 0.3 },
          ...paperAnim,
        }}
      >
        <PaperHeader cv={cv} />
      </motion.div>
      
      {projects.map((info, index) => (
        <ColorTitle
          key={"project" + index}
          index={index}
          info={info}
          data={info.attachments}
          num={projects.length}
          current={current}
          setCurrent={setCurrent}
          paletteSize={paletteSize}
          allColorsReady={allColorsReady}
          onColorReady={handleColorReady}
          cv={cv}
        />
      ))}
     
    </motion.div>
     
  );
}




const ColorTitle = ({
  index,
  info,
  data,
  num,
  current,
  setCurrent,
  paletteSize,
  allColorsReady,
  onColorReady,
  cv
 
}) => {
  const isDesktop = useDesktopDetect();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [firstMediaType, setFirstMediaType] = useState(data[0].type);
  const [base64Image, setBase64Image] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("black");

    const [isScrollable, setIsScrollable] = useState(false);

  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);
  const [showTopFade, setShowTopFade] = useState(false);
const [showBottomFade, setShowBottomFade] = useState(false);
  const scrollRef = useRef(null);


 const checkScrollPosition = useCallback(() => {
    if (scrollRef.current) {
      if (isDesktop) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isScrollable = scrollWidth > clientWidth;
        setIsScrollable(isScrollable)
        setShowLeftFade(scrollLeft > 0);
        setShowRightFade(isScrollable && scrollLeft < scrollWidth - clientWidth - 1);
      } else {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const isScrollable = scrollHeight > clientHeight;
        setIsScrollable(isScrollable)
        setShowTopFade(scrollTop > 0);
        setShowBottomFade(isScrollable && scrollTop < scrollHeight - clientHeight - 1);
      }
    }
  }, [isDesktop]);

  useEffect(() => {
    checkScrollPosition();
    const handleResize = () => checkScrollPosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkScrollPosition, data, info, allColorsReady]);



  const processFirstMedia = useCallback(async () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const firstMedia = data[0];

    // Skip color processing for PDFs and use default color
    if (firstMedia.type === "pdf") {
      setColor("#2563eb"); // Use a default blue color for PDFs
      setTextColor(getColorByBgColor("#2563eb"));
      onColorReady();
      return;
    }

    if (firstMedia.type === "video") {
      const video = videoRef.current;
      video.crossOrigin = "anonymous";

      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          resolve();
        };
      });

      await new Promise((resolve) => {
        video.onseeked = () => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          resolve();
        };
        video.currentTime = 0.1;
      });
    } else {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = firstMedia.url;

      await new Promise((resolve) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          resolve();
        };
      });
    }

    const base64 = canvas.toDataURL("image/jpeg");

    try {
      const colors = await prominent(base64, { amount: 6, format: "hex" });
      const mostColorful = getMostColorful(colors);
      setColor(mostColorful);
      setTextColor(getColorByBgColor(mostColorful));
      onColorReady();
    } catch (error) {
      console.error("Error getting prominent color:", error);
      onColorReady(); // Still call onColorReady to avoid blocking the process
    }
  }, [data, onColorReady]);

  useEffect(() => {
    processFirstMedia();
  }, [processFirstMedia]);


  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = useCallback((e) => {
    if (!isDesktop) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }, [isDesktop]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scrolling speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseUp, handleMouseMove]);


  
  // for mobile infinite flipping
   const totalRotations = Math.floor(current / (num+1));
    const currentIndex = current % (num+1);


  return (
    <>
      <motion.div 
        // shadow
        style={{
       width:
          isDesktop === true
            ? "100%"
            : `calc(100% - ${mobilePaperPadding} - ${(num - index - 1) * paletteSize}px)`,
          position: "absolute",
        top: 0,
        originX: 0,
        originY: 0,
     display:allColorsReady === true && toggleShadow === true ?'block' :'none',
      
      background:'rgba(0,0,0,0.4)',
      pointerEvents:'none',
       height:
          isDesktop === true
            ? `calc(100% - ${paperPadding} - ${(num - index - 1) * paletteSize}px)`
            : "100%",
      }} 
        initial={{opacity:0}}
        animate={{
              zIndex: num - index,
        skewX: index + 1 < current && isDesktop === true ? 30 : 0,
      
          skewY : index + 1 < currentIndex && isDesktop === false? 50: 0,

          opacity: (index + 1 < current && isDesktop === true) || (index + 1 < currentIndex && isDesktop === false) ? 0 :1,
          filter:(index + 1 < current && isDesktop === true ) || (index + 1 < currentIndex && isDesktop === false) ? 'blur(10px)' :'blur(0px)',
      }}
  transition={paperAnim}
       
        ></motion.div>
    <motion.div
      className="paper"
      key={info.heading}
      style={{
        width:
          isDesktop === true
            ? "100%"
            : `calc(100% - ${mobilePaperPadding} - ${(num - index - 1) * paletteSize}px)`,
        display: "flex",
        flexDirection: isDesktop === true ? "column" : "column-reverse",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: isDesktop === true ? "10px 20px" : "50px 20px 20px 20px",
        gap: 15,
        position: "absolute",
        top: 0,
        originX: 0,
        originY: 0,
        overflow: "hidden",
      }}
    
      animate={{
        rotateX: index + 1 < current && isDesktop === true ? 90 : 0,
      
        rotateY : index + 1 < currentIndex && isDesktop === false? -90 + -360 * totalRotations: 0 - 360 * totalRotations,


        zIndex: num - index,
        
      
        height:
          isDesktop === true
            ? `calc(100% - ${paperPadding} - ${(num - index - 1) * paletteSize}px)`
            : "100%",
        background: allColorsReady === true ? color : "#ffffff",
      }}
      transition={{
                ...paperAnim,

        width: { duration: isDesktop === true ? 0 : 0.3,},
        height: { duration: isDesktop === false ? 0 : 0.3,delay: isDesktop === true ?0.05*(index+1):0 },
        background:{duration:0,delay: isDesktop === true ?0.05*(index+1):0},
     
      }}
    >

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          height: isDesktop === true ? "fit-content" : "100%",
          overflowX: isDesktop === true ? "auto" : "hidden",
          overflowY: isDesktop === true ? "hidden" : "auto",
          position: "relative",
          cursor: isDesktop && isScrollable ? (isDragging ? 'grabbing' : 'grab') : 'default',


        }}
          ref={scrollRef}
        onScroll={checkScrollPosition}
                onMouseDown={handleMouseDown}

        className="hideScrollBar"
      >
        <motion.div
          style={{
            width: "fit-content",
            height: "fit-content",
            display: "flex",
            flexDirection: isDesktop === true ? "row" : "column",
            gap: 10,
            alignItems: isDesktop === true ? "flex-end" : "flex-start",
            justifyContent: "flex-start",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentIndex === index + 1 ? 1 : 0 }}
                    

        >
          {info.description && (
            <div
              style={{
                color: textColor,
                width: isDesktop === true ? "30vw" : "100%",
                fontSize: "0.9em",
                paddingTop: "5vh",
              }}
            >
              <RichText text={info.description} />
            </div>
          )}
          {data.map((item, index) => (
            <div
              key={"media" + index}
              style={{
                height: isDesktop === true ? "50vh" : "fit-content",
                width: isDesktop === false ? "100%" : "fit-content",
              }}
            >
              {item.type === "image" ? (
                <img
                  src={item.url}
                  style={{
                    height: isDesktop === true ? "100%" : undefined,
                    width: isDesktop === false ? "100%" : undefined,
                          pointerEvents: isDragging ? 'none' : 'auto',
                    userSelect: 'none',
                  }}
                  alt={`Attachment ${index}`}
                  draggable={false}

                />
              ) : item.type === "pdf" ? (
                <motion.div
                  style={{
                    height: isDesktop === true ? "100%" : "350px",
                    width: isDesktop === false ? "100%" : "450px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: "16px",
                    background: `linear-gradient(135deg, 
                      rgba(99, 102, 241, 0.8) 0%, 
                      rgba(168, 85, 247, 0.8) 35%, 
                      rgba(236, 72, 153, 0.8) 70%, 
                      rgba(251, 146, 60, 0.8) 100%)`,
                    position: "relative",
                    cursor: "pointer",
                    overflow: "hidden",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)",
                    padding: "24px",
                    backdropFilter: "blur(10px)"
                  }}
                  onClick={() => window.open(item.url, '_blank')}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Animated background decoration */}
                  <motion.div
                    style={{
                      position: "absolute",
                      top: "-50%",
                      right: "-50%",
                      width: "200%",
                      height: "200%",
                      background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                      pointerEvents: "none"
                    }}
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                  
                  {/* PDF Icon with animation */}
                  <motion.div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      zIndex: 2
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div
                      style={{
                        fontSize: isDesktop ? "64px" : "48px",
                        marginBottom: "12px",
                        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
                      }}
                      animate={{
                        y: [0, -8, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      📋
                    </motion.div>
                    
                    {/* Creative title design */}
                    <div
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: isDesktop ? "20px" : "16px",
                        fontWeight: "700",
                        marginBottom: "8px",
                        textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                        letterSpacing: "0.5px",
                        lineHeight: "1.2"
                      }}
                    >
                      {item.title || "PDF Document"}
                    </div>
                    
                    {/* Subtitle with badge design */}
                    <motion.div
                      style={{
                        background: "rgba(255,255,255,0.2)",
                        color: "white",
                        textAlign: "center",
                        fontSize: isDesktop ? "14px" : "12px",
                        fontWeight: "500",
                        padding: "6px 16px",
                        borderRadius: "20px",
                        border: "1px solid rgba(255,255,255,0.3)",
                        backdropFilter: "blur(10px)"
                      }}
                      whileHover={{ 
                        background: "rgba(255,255,255,0.3)",
                        scale: 1.05
                      }}
                    >
                      View Presentation
                    </motion.div>
                  </motion.div>
                  
                  {/* Bottom section with decorative elements */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      zIndex: 2
                    }}
                  >
                    <motion.div
                      style={{
                        display: "flex",
                        gap: "8px"
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.6)"
                          }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.6, 1, 0.6]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        />
                      ))}
                    </motion.div>
                    
                    <motion.div
                      style={{
                        color: "white",
                        fontSize: "18px",
                        opacity: 0.8
                      }}
                      whileHover={{ 
                        opacity: 1,
                        rotate: 45,
                        scale: 1.2
                      }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      ↗
                    </motion.div>
                  </div>
                  
                  {/* Decorative corner elements */}
                  <motion.div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      width: "20px",
                      height: "20px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderRadius: "4px",
                      pointerEvents: "none"
                    }}
                    animate={{
                      rotate: [0, 90, 0]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      right: "60px",
                      width: "16px",
                      height: "16px",
                      background: "rgba(255,255,255,0.2)",
                      borderRadius: "50%",
                      pointerEvents: "none"
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              ) : (
                <video
                  src={item.url}
                  autoPlay
                  muted
                  playsInline
                  loop
                  ref={index === 0 ? videoRef : null}
                  crossOrigin="anonymous"
                  style={{
                    height: isDesktop === true ? "100%" : undefined,
                    width: isDesktop === false ? "100%" : undefined,
                          pointerEvents: isDragging ? 'none' : 'auto',
                    userSelect: 'none',
                  }}
                  draggable={false}

                />
              )}
            </div>
          ))}
          <canvas
            ref={canvasRef}
            style={{ border: "1px solid yellow", display: "none", width: 50 }}
          />
        </motion.div>
      </div>

      <motion.div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          color: textColor,
        }}
      >
        
        {isDesktop === true || isDesktop === false && !info.url ? <p style={{ maxWidth: "70%" }}>{info.heading}</p> :<a
            href={info.url}
            target="_blank"
            style={{maxWidth: "100%" }}
          >
           {info.heading}{" ->"}
          </a>}
        
        <div
          style={{
            width: "30%",
            display: isDesktop === true? "flex":'none',
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p style={{ color: textColor, opacity: 0.5 }}>{info.year}</p>
          <a
            className={index === current - 1? null:"arrow"}
            href={info.url}
            target="_blank"
            style={{ display: isDesktop === true ? "block" : "none" }}
          >
         
            {index === current - 1 && <motion.span initial={{opacity:0}} animate={{opacity:0.6}}>Learn more</motion.span>} {info.url ? "->" : ""}
          </a>
        </div>
      </motion.div>

     {allColorsReady && scrollRef.current && isDesktop && (
        <>
          <motion.div
            animate={{ opacity: showLeftFade ? 1 : 0 }}
            style={{
              width: "10vw",
              height: `calc(100% - ${paletteSize + 10}px)`,
              top: 0,
              position: "absolute",
              left: 20,
              background: `linear-gradient(270deg, transparent, ${color})`,
              pointerEvents: "none",
            }}
          />
          <motion.div
            animate={{ opacity: showRightFade ? 1 : 0 }}
            style={{
              width: "10vw",
              height: `calc(100% - ${paletteSize + 10}px)`,
              top: 0,
              position: "absolute",
              right: 20,
              background: `linear-gradient(90deg, transparent, ${color})`,
              pointerEvents: "none",
            }}
          />
        </>
      )}
    </motion.div>
      </>
  );
};

function Footer({ cv }) {
  const isDesktop = useDesktopDetect();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        height: isDesktop === true ? paperPadding : 40,
        width: `calc(100% - ${paperPadding})`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        gap: 16,
        fontSize: "0.8em",
      }}
    >
      {cv.contact.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
          {cv.contact.map((contactItem, index) => {
            return (
              <motion.div
                key={contactItem.url}
                style={{ opacity: 0.4 }}
                whileHover={{ opacity: 0.6 }}
              >
                <a href={contactItem.url} target="_blank">
                  {contactItem.platform}
                </a>
              </motion.div>
            );
          })}
          
          <div
            style={{ width: 1, height: "1em", background: "white", opacity: 0.2 }}
          />
          
          <div style={{ opacity: 0.4, fontSize: "0.9em" }}>
            Rishabh ©
          </div>
        </div>
      ) : (
        <div style={{ opacity: 0.4, fontSize: "0.9em" }}>
          Rishabh ©
        </div>
      )}
    </div>
  );
}


function PaperHeader({ cv }) {
  const [isScrollable, setIsScrollable] = useState(false);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);
  const containerRef = useRef(null);
  const links = cv.contact;
  const about = cv.general.about;
  const isDesktop = useDesktopDetect();

  const checkScrollPosition = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isScrollable = scrollHeight > clientHeight;
      setIsScrollable(isScrollable);
      setShowTopFade(scrollTop > 0);
      setShowBottomFade(
        isScrollable && scrollTop < scrollHeight - clientHeight - 1,
      );
    }
  }, []);

  useEffect(() => {
    checkScrollPosition();
    const handleResize = () => checkScrollPosition();
    window.addEventListener("resize", handleResize);
    containerRef.current?.addEventListener("scroll", checkScrollPosition);

    return () => {
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeEventListener("scroll", checkScrollPosition);
    };
  }, [checkScrollPosition]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        display: "flex",
        minHeight: "100%",
        flexDirection: isDesktop === true ? "row" : "column",
        alignItems: isDesktop === true ? "flex-end" : "flex-start",
        justifyContent: "space-between",
        gap: 60,
        position: "relative",
        overflow: isDesktop === true ? "visible" : "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: 20,
          flexDirection: isDesktop === true ? "row" : "column",
          alignItems: isDesktop === true ? "flex-end" : "flex-start",
        }}
      >
        <div
          style={{
            width: "100%",
            position: "sticky",
            top: 0,
            background: "white",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "fit-content",
              display: "flex",
              flexDirection: isDesktop === true ? "column" : "column-reverse",
              gap: 20,
            }}
          >
            {cv.general.byline && <p style={{zIndex:4}}>{cv.general.byline}</p>}

            {cv.general.displayName.startsWith('/') ? (
              <img 
                src={cv.general.displayName}
                alt="Logo"
                style={{
                  height: "10vw",
                  width: "auto",
                  maxWidth: "100%",
                  objectFit: "contain"
                }}
              />
            ) : (
              <h1
                className="anton"
                style={{
                  fontSize: "10vw",
                  width: "fit-content",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {cv.general.displayName}
              </h1>
            )}
            {isDesktop === false && isScrollable === true && (
              <motion.div
                style={{
                  position: "absolute",
                  width: "100%",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,1), rgba(255,255,255,1),  rgba(255,255,255,0))",
                  height: 60,
                  zIndex:0,
                  left: 0,
                  pointerEvents: "none",
                }}
                initial={{ bottom:-30 }}
                animate={{ bottom: showTopFade ? -60 : -30 }}
              />
            )}
            {isDesktop === false && isScrollable === true && (
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  height: `calc(100% - ${mobilePaperPadding} * 2 - 48px)`,
                  top: 0,
                  display: "flex",
                  alignItems: "flex-end",
                  pointerEvents: "none",
                }}
              >
                <motion.div
                  style={{
                    width: "100%",
                    background:
                      "linear-gradient(0deg, rgba(255,255,255,1), rgba(255,255,255,0))",
                    height: 30,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showBottomFade ? 1 : 0 }}
                />
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            width: isDesktop === true ? "80%" : "100%",
            fontSize: "0.9em",
          }}
        >
          {about && <RichText text={about} />}
        </div>
      </div>
      {cv.contact.length > 0 && isDesktop === false && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            // position: "absolute",
            bottom: 0,
            fontSize: "0.9em",
          }}
        >
          {cv.contact.map((contactItem, index) => {
            return (
              <div key={contactItem.url}>
                <a href={contactItem.url} target="_blank">
                  {contactItem.platform}
                </a>
              </div>
            );
          })}
          <div style={{ fontSize: "0.9em", opacity: 0.6 }}>
            Rishabh ©
          </div>
        </div>
      )}
    </div>
  );
}


// Simplified scroll component removed to prevent hanging issues in window environment

// colorUtils.js

/**
 * Get the prominent colors from an image, prioritizing distinctive colors.
 * @param {string} src - The source of the image (URL or base64).
 * @param {Object} options - Options for color extraction.
 * @returns {Promise<string[]>} A promise that resolves to an array of color values.
 */
export const prominent = (src, options = {}) => {
  const {
    amount = 5,
    format = 'hex',
    sample = 10, // Increase this for faster processing, decrease for more accuracy
    distinctiveThreshold = 0.15, // Adjust this to change what's considered a distinctive color
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const colors = getProminent(imageData, { amount, format, sample, distinctiveThreshold });
      resolve(colors);
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
};

/**
 * Get the most prominent colors from image data, prioritizing distinctive colors.
 * @param {Uint8ClampedArray} data - The image data.
 * @param {Object} options - Options for color extraction.
 * @returns {string[]} An array of color values.
 */
const getProminent = (data, options) => {
  const { amount, format, sample, distinctiveThreshold } = options;
  const colorCounts = new Map();
  const step = 4 * sample;

  for (let i = 0; i < data.length; i += step) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // Skip fully transparent pixels
    if (a === 0) continue;

    const rgb = `${r},${g},${b}`;
    colorCounts.set(rgb, (colorCounts.get(rgb) || 0) + 1);
  }

  const sortedColors = Array.from(colorCounts.entries())
    .map(([color, count]) => ({
      rgb: color.split(',').map(Number),
      count,
      distinctiveness: getColorDistinctiveness(color.split(',').map(Number))
    }))
    .sort((a, b) => {
      // Prioritize distinctive colors, then by count
      if (a.distinctiveness > distinctiveThreshold && b.distinctiveness <= distinctiveThreshold) return -1;
      if (b.distinctiveness > distinctiveThreshold && a.distinctiveness <= distinctiveThreshold) return 1;
      return b.count - a.count;
    })
    .slice(0, amount)
    .map(({ rgb }) => formatColor(rgb, format));

  return sortedColors;
};

/**
 * Calculate the distinctiveness of a color.
 * @param {number[]} rgb - The RGB values of the color.
 * @returns {number} A value between 0 and 1, where higher values are more distinctive.
 */
const getColorDistinctiveness = (rgb) => {
  const [r, g, b] = rgb;
  
  // Calculate the standard deviation of the RGB values
  const mean = (r + g + b) / 3;
  const variance = ((r - mean) ** 2 + (g - mean) ** 2 + (b - mean) ** 2) / 3;
  const stdDev = Math.sqrt(variance);
  
  // Normalize the standard deviation to a 0-1 range
  // A higher value means the color is more distinctive
  return Math.min(stdDev / 127.5, 1);
};

/**
 * Format a color value to the desired output format.
 * @param {number[]} rgb - The RGB color values.
 * @param {string} format - The desired output format ('rgb', 'array', or 'hex').
 * @returns {string|number[]} The formatted color value.
 */
const formatColor = (rgb, format) => {
  switch (format) {
    case 'rgb':
      return `rgb(${rgb.join(',')})`;
    case 'array':
      return rgb;
    case 'hex':
    default:
      return rgbToHex(rgb);
  }
};

/**
 * Convert RGB values to a hex color string.
 * @param {number[]} rgb - The RGB color values.
 * @returns {string} The hex color string.
 */
const rgbToHex = (rgb) => 
  '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');

/**
 * Determine the best text color (black or white) based on the background color.
 * @param {string} bgColor - The background color in hex format.
 * @returns {string} The recommended text color ('#000' for black or '#fff' for white).
 */
export const getColorByBgColor = (bgColor) => {
  if (!bgColor) return '';
  const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const uicolors = [r / 255, g / 255, b / 255];
  const c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  const L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
  return (L > 0.179) ? '#000' : '#fff';
};

/**
 * Get the most colorful color from an array of colors.
 * @param {string[]} colors - An array of hex color strings.
 * @returns {string} The most colorful color.
 */
export const getMostColorful = (colors) => {
  if (!Array.isArray(colors) || colors.length === 0) {
    return undefined;
  }
  return colors.reduce((prev, current) => {
    return getColorfulness(current) > getColorfulness(prev) ? current : prev;
  });
};

/**
 * Get the colorfulness value of a hex color.
 * @param {string} hex - The hex color string.
 * @returns {number} The colorfulness value.
 */
const getColorfulness = (hex) => {
  hex = hex.replace(/^#/, '');
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const l = (max + min) / 2;
  const s = max === 0 ? 0 : d / max;
  
  // Colorfulness is a combination of saturation and brightness
  return s * Math.sqrt(l); // This formula can be adjusted for different perceptions of colorfulness
};


export const useDesktopDetect = () => {
  const [isDesktop, setIsDesktop] = useState(() => {
    // Check if window is defined (we're in the browser, not server-side)
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    // Default to false if window is not defined
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesktop;
};

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <AnimatePresence>
      <motion.div
        className="flipbook-loading-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flipbook-spinner"></div>
        <motion.div
          className="flipbook-loading-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Loading Portfolio
        </motion.div>
        <motion.div
          className="flipbook-loading-subtext"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Preparing content for viewing...
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Flipbook;
