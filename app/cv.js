import profileData from '../public/content/profileData.json';

const Tabs = [
  "Projects",
  "Side Projects",
  "Exhibitions",
  "Speaking",
  "Writing",
  "Awards",
  "Features",
  "Work Experience",
  "Volunteering",
  "Education",
  "Certifications",
  "Contact",
];

function profileSectionToJSONField(section) {
  switch (section) {
    case "Projects":
      return "projects";
    case "Side Projects":
      return "sideProjects";
    case "Exhibitions":
      return "exhibitions";
    case "Speaking":
      return "talks";
    case "Writing":
      return "writing";
    case "Awards":
      return "awards";
    case "Features":
      return "features";
    case "Work Experience":
      return "workExperience";
    case "Volunteering":
      return "volunteering";
    case "Education":
      return "education";
    case "Certifications":
      return "certifications";
    case "Contact":
      return "contact";
  }
  return undefined;
}

class CVMediaObject {
  constructor(props) {
    this.url = props.url;
    this.width = props.width;
    this.height = props.height;
  }

  toString() { return this.url; }
}

const mediaFiles = {
  "backdrop.jpg": {
    "url": "/mediaManager/backdrop.jpg",
    "width": 3840,
    "height": 2160
  },
  "contact.png": {
    "url": "/mediaManager/contact.png",
    "width": 1024,
    "height": 1024
  },
  "document.png": {
    "url": "/mediaManager/document.png",
    "width": 32,
    "height": 32
  },
  "folder.png": {
    "url": "/mediaManager/folder.png",
    "width": 1024,
    "height": 1024
  },
  "listen.png": {
    "url": "/mediaManager/listen.png",
    "width": 736,
    "height": 715
  },
  "soundtrack-cover.jpg": {
    "url": "/mediaManager/soundtrack-cover.jpg",
    "width": 1080,
    "height": 1080
  },
  "soundtrack.mp3": {
    "url": "/mediaManager/soundtrack.mp3"
  },
  "soundcloud.png": {
    "url": "/mediaManager/soundcloud.png",
    "width": 736,
    "height": 715
  }
};
mediaFiles[''] = { url: '' };

const cv = {
  ...profileData,
  get allCollections() {
    const ret = [];
    const sections = profileData.general.sectionOrder || Tabs;
    for (const section of sections) {
      const jsonField = profileSectionToJSONField(section);
      if (typeof jsonField == "undefined") {
        continue;
      }
      const fieldValue = profileData[jsonField];
      if (!Array.isArray(fieldValue) || fieldValue.length === 0) {
        continue;
      }
      ret.push({
        name: section,
        items: fieldValue,
      });
    }
    return ret;
  },
  media: (filename) => {
    return new CVMediaObject(mediaFiles[filename] || mediaFiles['']);
  },
};

export default cv;
