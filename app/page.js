"use client";

import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { RichText, combineCollections } from 'readcv';
import { motion, useDragControls, AnimatePresence, useMotionValue } from 'framer-motion';
import '@fontsource/ia-writer-mono/400.css';
import '@fontsource/ia-writer-mono/700.css';
import '@fontsource/ia-writer-mono/400-italic.css';
import '@fontsource/ia-writer-mono/700-italic.css';

import cv from './cv';

function App() {
  return (
    <div className="container">
      <Toolbar/>
      <Desktop/>
    </div>
  );
}


function About(props) {
  return (
    <div className="about">
      <div className="aboutContent">
        <div className="aboutHeader">
          <div className="pfp">
            <img src={cv.general.profilePhoto}/>
          </div>
          <div>
            <h2>{cv.general.displayName}</h2>
            {cv.general.byline ? <p>{cv.general.byline}</p> : null}
          </div>
        </div>
        {(cv.contact && cv.contact.length > 0) || cv.general.about ?
          <div className="contactItems">
            {cv.contact && cv.contact.length > 0 ?
              <>
                {cv.contact.map((contactItem, index) => {
                  return (
                    <>
                      <div key={contactItem.id} className="contactLabel">{contactItem.platform}</div>
                      <div className="contactItem">
                        <a href={contactItem.url} target="_blank">{contactItem.handle}</a>
                      </div>
                      {(index !== cv.contact.length - 1) ?
                        <hr/>
                      : null}
                    </>
                  )
                })}
              </>
          : null}
          {cv.general.about ?
            <>
              <hr/>
              <div className="contactLabel">About</div>
              <div className="contactItem">
                <RichText text={cv.general.about}/>
              </div>
            </>
          : null}
          </div>
        : null}
      </div>
    </div>
  );
}


function Desktop(props) {
  const [windows, setWindows] = useState([]);
  const [windowOrder, setWindowOrder] = useState([]);

  const handleFocus = (indexToMove) => {
    const windowToFocus = windows[indexToMove];
    setWindowOrder(prevOrder => [...(prevOrder.filter(x => x !== windowToFocus)), windowToFocus]);
  };

  const handleRemove = (indexToRemove) => {
    const windowToRemove = windows[indexToRemove];
    setWindows((prevArr) => prevArr.filter(x => x !== windowToRemove));
    setWindowOrder(prevOrder => prevOrder.filter(x => x !== windowToRemove));
  };

  const addWindow = (object) => {
    setWindows(prevItems => [...prevItems, object]);
    setWindowOrder(oldOrder => [...oldOrder, object]);
  }
  
  return (
    <div className="desktop">
      <div className="icons">
        <Icon
          icon={
            cv.general.profilePhoto ?
            <div className="profilePhoto">
              <img src={cv.general.profilePhoto} draggable={false}/>
            </div>
            :
            <img src={cv.media("contact.png")} draggable={false}/>
          }
          collection={{
            name: "About Me"
          }}
          open={() => {
            if (windows.some(e => e.id === cv.general.username)) { 
              let index = windows.findIndex(e => e.id === cv.general.username);
              handleFocus(index);
              return
            }
            addWindow({
              type: "about",
              name: "About Me",
              id: cv.general.username,
            });
          }}
        />
        {cv.allCollections.map((collection, index) => {
          if (collection.name === "Contact") { return }
          return (
            <Icon
              open={() => {
                if (windows.some(e => e.collection === collection)) { 
                  let index = windows.findIndex(e => e.collection === collection);
                  handleFocus(index);
                  return
                }
                addWindow({
                  type: "folder",
                  name: collection.name,
                  collection: collection
                });
              }}
              icon={<img src={cv.media("folder.png")} draggable={false}/>}
              collection={collection}
              key={collection.name}/>
          )
        })}
        {cv.general.status && cv.general.status.text ?
          <Icon
            open={() => {
              if (windows.some(e => e.status === cv.general.status)) {
                let index = windows.findIndex(e => e.status === cv.general.status);
                handleFocus(index);
                return
              }
              addWindow({
                type: "status",
                name: "Status",
                status: cv.general.status
              });
            }}
            icon={<div className="statusIcon">{cv.general.status.emoji}</div>}
            collection={{
              type: "status",
              name: "Status",
              status: cv.general.status,
            }}
          />
        : null}  
        {siteSettings.soundtrack ?
          <Icon
            open={() => {
              if (windows.some(e => e.track === siteSettings.soundtrack)) {
                let index = windows.findIndex(e => e.track === siteSettings.soundtrack);
                handleFocus(index);
                return 
              }
              addWindow({
                type: "soundtrack",
                name: "Soundtrack",
                track: siteSettings.soundtrack,
              });
            }}
            icon={<img src={cv.media("listen.png")} draggable={false}/>}
            collection={{
              name: "Listen"
            }}
          />
        : null}
      </div>
      {windows.length > 0 ?
        <div className="windows">
          {windows.map((item, index) => {
            let maxWidth = window.innerWidth - 12;
            let content;
            let size;
            let key;
            if (item.type === "folder") {
              content = <Folder collection={item.collection} open={addWindow} focus={handleFocus} windows={windows}/>;
              size = { width: Math.min(540, maxWidth), height: 360 }
            } else if (item.type === "experience") {
              content = <Note experience={item.experience} open={addWindow} windows={windows}/>;
              size = { width: Math.min(684, maxWidth), height: 540 }
              key = item.experience.id;
            } else if (item.type === "status") {
              content = <Sticky status={item.status}/>
              size ={ width: Math.min(320, maxWidth), height: 280 }
            } else if (item.type === "media") {
              content = <Media media={item.attachment}/>;
              size = {
                width: Math.min(684, maxWidth),
                height: (Math.min(684, maxWidth) * (item.attachment.height / item.attachment.width)) + 44,
              }
              key = item.attachment.url
            } else if (item.type === "about") {
              content = <About/>
              size = { width: Math.min(480, maxWidth), height: 360 }
            } else if (item.type === "soundtrack") {
              content = <Player close={() => handleRemove(index)}/>
              size = { width: 220, height: 220 }
            }
            return (
              <Window
                key={key ? key : item.name}
                width={size.width}
                height={size.height}
                focus={() => handleFocus(index)}
                close={() => handleRemove(index)}
                title={item.name}
                type={item.type}
                zIndex={windowOrder.indexOf(item)}
                index={index}>
                {content}
              </Window>
            )
          })}
        </div>
      : null}
    </div>
  );
}

function Icon(props) {
  return (
    <div
      onDoubleClick={props.open}
      tabindex={0}
      className="desktopItem">
      <div className="icon">
        {props.icon ? props.icon : null}
      </div>
      <div className="label">
        {props.collection.name}
      </div>
    </div>
  )
}


function Folder(props) {
  const [selectedIndex, setSelectedIndex] = useState();
  
  return (
    <>
      <div className="fileHeader">
        <div style={{ paddingLeft: 24 }}>Name</div>
        <div>Date</div>
      </div>
      <ul className="fileList">
        {props.collection && props.collection.items.map((item, index) => {
          return (
            <li
              className={selectedIndex === index ? "focused" : undefined}
              onDoubleClick={() => {
                if (props.windows.some(e => e.experience === item)) {
                  let index = props.windows.findIndex(e => e.experience === item);
                  props.focus(index);
                  return
                }
                props.open({
                  type: "experience",
                  name: item.heading,
                  experience: item
                })
              }}
              onMouseDown={() => setSelectedIndex(index)}
              key={item.heading}>
              <div className="name">
                <div className="fileIcon">
                  <img src={cv.media("document.png")} draggable={false}/>
                </div>
                <span>{item.heading}</span>
              </div>
              <div className="year">{item.year}</div>
            </li>
          )
        })}
      </ul>
    </>
  );
}


function Intro(props) {
  return (
    <div className="intro">

    </div>
  );
}


function Media(props) {
  let attachment = props.media.type === "image" ? <img src={props.media.url}/> : <video src={props.media.url} autoPlay muted playsInline loop/>
  return (
    <div className="fullScreenMedia">
      {attachment}
    </div>
  );
}


function Note(props) {
  return (
    <div className="note">
      <div className="noteContent">
        <h2>{props.experience.heading}</h2>
        {props.experience.year || props.experience.location ?
        <p>
          {props.experience.year ? props.experience.year : null}
          {props.experience.year && props.experience.location ? ", " : null}
          {props.experience.location ? props.experience.location : null}
        </p>
        : null}
        {props.experience.description ?
          <RichText text={props.experience.description}/>
        : null}
        {props.experience.url ?
          <p><a href={props.experience.url} target="_blank">View link</a></p>
        : null}
        {props.experience.attachments && props.experience.attachments.length > 0 ?
          <Attachments attachments={props.experience.attachments} open={props.open} windows={props.windows}/>
        : null}
      </div>
    </div>
  );
}

function Attachments(props) {
  return (
    <div className="noteAttachments">
      {props.attachments.map((media, index) => {
        let attachment = media.type === "image" ? <img src={media.url}/> : <video src={media.url} autoPlay muted playsInline loop/>
      
        return (
          <div
            tabindex={0}
            class="media"
            style={{
              aspectRatio: media.width / media.height,
            }}
            onDoubleClick={() => {
              if (props.windows.some(e => e.attachment === media)) { return }
              props.open({
                type: "media",
                name: media.width + " × " + media.height,
                attachment: media
              })
            }}
            key={media.url}
            >
            {attachment}
          </div>
        )
      })}
    </div>
  )
}


function Player(props) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    const { currentTime, duration } = audioRef.current;
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement.addEventListener('timeupdate', updateProgress);

    return () => {
      audioElement.removeEventListener('timeupdate', updateProgress);
    };
  }, []);
  
  return (
    <div
      className="soundtrack"
      data-theme={siteSettings.soundtrack.playerColor}
      data-paused={!isPlaying}>
      <div className="controls">
        <PlayerButton className="closeSoundtrack" onClick={props.close}>
          <Close12/>
        </PlayerButton>
        <PlayerButton
          className="playToggle"
          onClick={togglePlayPause}
        >
          {isPlaying ? <Pause12/> : <Play12/>}
          <div className="progress">
            <Progress24 percentage={progress}/>
          </div>
        </PlayerButton>
      </div>
      <img src={siteSettings.soundtrack.artwork} draggable={false}/>
      <audio
        ref={audioRef}
        autoplay="true" src={siteSettings.soundtrack.track}/>
    </div>
  );
}

function PlayerButton(props) {
  return (
    <button
      className={"playerButton " + props.className}
      onClick={props.onClick}>
      {props.children}
    </button>
  )
}

function Pause12(props) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 1a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zM8.5 1a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"
        fill={siteSettings.soundtrack.playerColor === "light" ? "#fff" : "#000"}
      />
    </svg>
  );
}

function Play12(props) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.748 1.068a.5.5 0 01.497-.004l8 4.5a.5.5 0 010 .872l-8 4.5A.5.5 0 012.5 10.5v-9a.5.5 0 01.248-.432z"
        fill={siteSettings.soundtrack.playerColor === "light" ? "#fff" : "#000"}
      />
    </svg>
  );
}

function Close12(props) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.793 1.793c.214-.215.547-.231.742-.036l.707.707c.195.196.18.528-.035.743L7.414 6l2.793 2.793c.214.215.23.547.035.743l-.707.707c-.195.195-.528.18-.742-.036L5.999 7.414l-2.792 2.793c-.215.215-.548.23-.743.036l-.707-.708c-.195-.195-.18-.527.035-.742L4.585 6 1.792 3.207c-.215-.215-.23-.547-.035-.742l.707-.708c.195-.195.528-.179.742.036L6 4.586z"
        fill={siteSettings.soundtrack.playerColor === "light" ? "#fff" : "#000"}
      />
    </svg>
  );
}

function Progress24(props) {
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);

      // Initially set the stroke-dasharray and stroke-dashoffset
      pathRef.current.style.strokeDasharray = `${(props.percentage / 100) * length} ${length}`;
      pathRef.current.style.strokeDashoffset = 0;
    }
  }, [props.percentage]);
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
      <circle
        ref={pathRef}
        cx={12}
        cy={12}
        r={11.5}
        stroke="#fff"
        style={{
          stroke: siteSettings.soundtrack.playerColor === "light" ? "#fff" : "#000",
          strokeOpacity: 1,
        }}
      />
    </svg>
  )
}


const siteSettings = {
  toolbarColor: "dark", // "light" or "dark"
  soundtrack: {
    track: cv.media("soundtrack.mp3"), // replace soundtrack.mp3 in media manager to customize
    artwork: cv.media("soundtrack-cover.jpg"), // replace soundtrack-cover.jpg in media manager to customize
    playerColor: "light", // "light or dark"
  }
}


function Sticky(props) {
  let date = new Date(props.status.timestamp);
  let day = date.toLocaleString('en-En',{
      weekday: "short",
    });
    let month = date.toLocaleString('en-En',{
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  return (
    <div className="sticky">
      <RichText text={props.status.text}/>
      <p>&ndash; {day} {month}</p>
    </div>
  );
}


function Toolbar(props) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date) => {
    let day = date.toLocaleString('en-En',{
      weekday: "short",
    });
    let month = date.toLocaleString('en-En',{
      month: "short",
      day: "numeric",
    });
    let time = date.toLocaleTimeString('en-En', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true 
    });
    return (
      <div style={{ display: 'flex' }}>
        <span>{day}&nbsp;{month}</span>
        <div style={{ width: '0.5em'}}/>
        <span>{time}</span>
      </div>
    )
  };
  
  return (
    <div className="toolbar" data-theme={siteSettings.toolbarColor}>
      <h1>{cv.general.displayName}</h1>
      <div style={{ marginLeft: 'auto' }}>
        <div>{formatTime(time)}</div>
      </div>
    </div>
  );
}


function Window(props) {
  const controls = useDragControls()
  const windowRef = useRef(null);
  const scrollRef = useRef(null);
  const x = useMotionValue(24 + (props.index * 24));
  const y = useMotionValue(24 + (props.index * 24));
  const width = useMotionValue(props.width);
  const height = useMotionValue(props.height);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!windowRef.current) { return }
    windowRef.current.focus();
  }, []);

  useEffect(() => {
    if (!scrollRef.current || props.type === "soundtrack") { return }
    let maxHeight = window.innerHeight - (28 + 24 + 96);
    let newHeight = Math.min(props.width * 1.334, (scrollRef.current.scrollHeight + 53));
    height.set(Math.min(newHeight, maxHeight));
    if (x.get() + props.width > window.innerWidth) {
      x.set((window.innerWidth - props.width) / 2);
    }
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    const handleScroll = (event) => {
      if (element.scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (element) {
      element.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  function startDrag(event) {
    controls.start(event)
  }

  function updateX(v, i, m, orig) {
    v.set(v.get() + m * i.delta.x);
  }

  function updateY(v, i, m) {
    v.set(v.get() + m * i.delta.y);
  }

  function updateValues(savedSize, minSize, size, m1, savedPos, pos, m2, offset) {
    const newSize = Math.round(savedSize + m1 * offset);
    if (newSize >= minSize) {
      size.set(newSize);
      pos.set(Math.round(savedPos + m2 * offset));
    }
  }

  const saved = useRef(undefined);
  function saveValues() {
    if (saved.current !== undefined) {
      return;
    }
    saved.current = {
      x: x.get(),
      y: y.get(),
      width: width.get(),
      height: height.get(),
    };
  }
  function clearValues() {
    saved.current = undefined;
  }

  const startX = useRef(undefined);
  const startY = useRef(undefined);
  const startWidth = useRef(0);
  function onPanStart(event, info) {
    document.body.style.userSelect = "none";
  }

  function onPanEnd() {
    document.body.style.userSelect = undefined
    clearValues();
  }
  
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragListener={props.type !== "soundtrack" ? false : undefined}
      dragConstraints={{
        top: -6,
      }}
      dragElastic={0}
      tabindex={0}
      preventScroll={true}
      ref={windowRef}
      onFocus={() => props.focus()}
      style={{
        zIndex: props.zIndex,
        x,
        y,
        width,
        height,
      }}
      dragControls={controls}
      onDrag={(event, info) => {
        x.set(Math.round(x.get()));
        y.set(Math.round(y.get()));
        width.set(Math.round(width.get()));
        height.set(Math.round(height.get()));
      }}
      className="windowWrap"
    >
      {props.type !== "soundtrack" ?
      <>
      <motion.div className="dragHandle n" onPanStart={onPanStart} onPanEnd={onPanEnd} onPan={(event, info) => {
        saveValues();
        updateValues(saved.current.height, 180, height, -1, saved.current.y, y, 1, info.offset.y);
      }}/>
      <motion.div className="dragHandle s" onPanStart={onPanStart} onPanEnd={onPanEnd} onPan={(event, info) => {
        saveValues();
        updateValues(saved.current.height, 180, height, 1, saved.current.y, y, 0, info.offset.y);
      }}/>
      <motion.div className="dragHandle e" onPanStart={onPanStart} onPanEnd={onPanEnd} onPan={(event, info) => {
        saveValues();
        updateValues(saved.current.width, 220, width, 1, saved.current.x, x, 0, info.offset.x);
      }}/>
      <motion.div className="dragHandle w" onPanStart={onPanStart} onPanEnd={onPanEnd} onPan={(event, info) => {
        saveValues();
        updateValues(saved.current.width, 220, width, -1, saved.current.x, x, 1, info.offset.x);
      }}/>
      <motion.div className="dragHandle ne" onPanStart={onPanStart} onPanEnd={onPanEnd} onPan={(event, info) => {
        saveValues();
        updateValues(saved.current.height, 180, height, -1, saved.current.y, y, 1, info.offset.y);
        updateValues(saved.current.width, 220, width, 1, saved.current.x, x, 0, info.offset.x);
      }}/>
      <motion.div className="dragHandle nw" onPanStart={onPanStart} onPanEnd={onPanEnd} onPan={(event, info) => {
        saveValues();
        updateValues(saved.current.height, 180, height, -1, saved.current.y, y, 1, info.offset.y);
        updateValues(saved.current.width, 220, width, -1, saved.current.x, x, 1, info.offset.x);
      }}/>
      <motion.div className="dragHandle se" onPanStart={onPanStart} onPanEnd={onPanEnd} onPan={(event, info) => {
        saveValues();
        updateValues(saved.current.height, 180, height, 1, saved.current.y, y, 0, info.offset.y);
        updateValues(saved.current.width, 220, width, 1, saved.current.x, x, 0, info.offset.x);
      }}/>
      <motion.div className="dragHandle sw" onPanStart={onPanStart} onPanEnd={onPanEnd} onPan={(event, info) => {
        saveValues();
        updateValues(saved.current.height, 180, height, 1, saved.current.y, y, 0, info.offset.y);
        updateValues(saved.current.width, 220, width, -1, saved.current.x, x, 1, info.offset.x);
      }}/>
      </> : null}
      
      <div
        className="window"
        data-scrolled={isScrolled}
        data-type={props.type}>
        <div
          className="windowHeader"
          style={{ touchAction: "none" }}
          onPointerDown={startDrag}
        >
          <div className="trafficLights">
            <button onClick={props.close}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={12}
                height={12}
                fill="none"
              >
                <path
                  fill="#4D0000"
                  d="M3.172 8.121a.5.5 0 1 0 .707.707L6 6.707l2.122 2.121a.5.5 0 0 0 .707-.707L6.707 6 8.83 3.878a.5.5 0 0 0-.707-.707L6 5.293 3.88 3.17a.5.5 0 1 0-.707.708l2.121 2.12z"
                  style={{
                    fill: "#4d0000",
                  }}
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={12}
                height={12}
                fill="none"
              >
                <path
                  fill="#995700"
                  d="M2 6a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 2 6"
                  style={{
                    fill: "#995700",
                  }}
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={12}
                height={12}
                fill="none"
              >
                <path
                  fill="#006500"
                  d="M7.5 9 3 4.5v4a.5.5 0 0 0 .5.5zM4.5 3h4a.5.5 0 0 1 .5.5v4z"
                  style={{
                    fill: "#006500",
                  }}
                />
              </svg>
            </button>
          </div>
          <div className="title">{props.title}</div>
        </div>
        <div
          ref={scrollRef}
          className="windowContent">
          {props.children}
        </div>
      </div>
    </motion.div>
  );
}


export default App;