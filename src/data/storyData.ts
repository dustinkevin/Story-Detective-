import {
  ClueCard,
  PredictionOption,
  RetellingSentenceFrame,
  StoryPage,
} from '../types';

export const coverImage = '/src/assets/images/story_detective_cover_1791216609635.jpg';
export const yardSceneImage = '/src/assets/images/story_yard_modern_emma_1791219276429.jpg';
export const bakerySceneImage = '/src/assets/images/story_bakery_modern_emma_1791219293826.jpg';
export const crosswalkSceneImage = '/src/assets/images/story_page4_sam_stop_park_1791220510064.jpg';
export const parkBridgeSceneImage = '/src/assets/images/story_park_modern_emma_1791219327333.jpg';
export const bridgeDiscoverySceneImage = '/src/assets/images/story_bridge_rescue_emma_1791219340162.jpg';

export const predictionQuestion = {
  prompt: 'Where do you think Coco went?',
  subtext: 'Look at the cover clues and make your detective prediction!',
  options: [
    {
      id: 'park',
      label: 'Sunny Park',
      iconEmoji: '🌳',
      previewText: 'A big park with green trees, trails, and a wooden bridge.',
    },
    {
      id: 'bakery',
      label: 'Mrs. Higgins’s Bakery',
      iconEmoji: '🥖',
      previewText: 'The warm bread shop on the neighborhood corner.',
    },
    {
      id: 'school',
      label: 'The School Crosswalk',
      iconEmoji: '🏫',
      previewText: 'The crosswalk where children cross the street.',
    },
  ] as PredictionOption[],
};

// 6 Clues total
export const allClueCards: ClueCard[] = [
  {
    id: 'clue-1',
    title: 'Open Gate & Red Ball',
    tagline: 'Left behind in the grass',
    description: 'The front garden gate was unlocked and standing wide open, with Coco’s red ball left in the grass.',
    pageNumber: 1,
    iconEmoji: '🎾',
    orderIndex: 1,
  },
  {
    id: 'clue-2',
    title: 'Muddy Paw Prints',
    tagline: 'Fresh tracks heading outside',
    description: 'A trail of wet muddy dog footprints leading down the path toward the sidewalk.',
    pageNumber: 2,
    iconEmoji: '🐾',
    orderIndex: 2,
  },
  {
    id: 'clue-3',
    title: 'Mrs. Higgins’s Sighting',
    tagline: 'Heard the jingling collar bell',
    description: 'Mrs. Higgins at the bakery heard a silver bell collar jingling past Maple Street.',
    pageNumber: 3,
    iconEmoji: '🔔',
    orderIndex: 3,
  },
  {
    id: 'clue-4',
    title: 'Sam’s Park Direction',
    tagline: 'Pointed yellow sign to Sunny Park',
    description: 'Sam the crossing guard saw a fluffy dog run across the street toward Sunny Park.',
    pageNumber: 4,
    iconEmoji: '🚸',
    orderIndex: 4,
  },
  {
    id: 'clue-5',
    title: 'Blue Ribbon on Bush',
    tagline: 'Torn piece of blue fabric',
    description: 'A blue ribbon caught on a leafy bush right at the entrance to Sunny Park.',
    pageNumber: 5,
    iconEmoji: '🎗️',
    orderIndex: 5,
  },
  {
    id: 'clue-6',
    title: 'Sounds Under the Bridge',
    tagline: 'A soft bark and tiny meow',
    description: 'Quiet barks and meows coming from the dry shelter underneath the wooden park bridge.',
    pageNumber: 6,
    iconEmoji: '🌉',
    orderIndex: 6,
  },
];

export const storyPages: StoryPage[] = [
  // Page 1
  {
    pageNumber: 1,
    title: 'The Empty Yard',
    locationName: "Emma's House",
    illustration: yardSceneImage,
    illustrationAlt: 'Emma in her red jacket and yellow backpack looking at the open front yard gate and red ball',
    storyText: 'Emma arrived home from school. The front gate was open, and Coco was not in the yard!',
    keyWords: {
      arrived: {
        word: 'arrived',
        pronunciation: '/əˈraɪvd/',
        definition: 'Came to a place or reached home.',
        exampleSentence: 'Emma arrived home at four o’clock.',
        iconEmoji: '🎒',
      },
      gate: {
        word: 'gate',
        pronunciation: '/ɡeɪt/',
        definition: 'A small door in an outside fence or garden wall.',
        exampleSentence: 'Please close the garden gate.',
        iconEmoji: '🚪',
      },
      yard: {
        word: 'yard',
        pronunciation: '/jɑːrd/',
        definition: 'An open outdoor area of grass around a house.',
        exampleSentence: 'The dog loves to run in the yard.',
        iconEmoji: '🏡',
      },
    },
    hasClueToCollect: true,
    clue: allClueCards[0],
    hotspots: [
      {
        id: 'hs-gate',
        name: 'The Open Garden Gate',
        description: 'Look at the wooden fence gate! It was left unlatched and standing wide open on the left.',
        xPercent: 18,
        yPercent: 50,
        isMainClue: true,
      },
      {
        id: 'hs-ball',
        name: 'Coco’s Red Ball',
        description: 'Coco’s favorite bright red rubber ball is resting on the lawn grass.',
        xPercent: 80,
        yPercent: 83,
        isMainClue: true,
      },
      {
        id: 'hs-emma',
        name: 'Emma Arriving Home',
        description: 'Emma in her red hoodie jacket and yellow backpack is searching for Coco.',
        xPercent: 41,
        yPercent: 48,
        isMainClue: false,
      },
    ],
  },

  // Page 2
  {
    pageNumber: 2,
    title: 'Tracks in the Mud',
    locationName: 'Garden Path',
    illustration: yardSceneImage,
    illustrationAlt: 'Emma looking at muddy dog paw prints along the stone walkway',
    storyText: 'Emma checked the doghouse. She saw fresh muddy paw prints heading toward the sidewalk.',
    keyWords: {
      checked: {
        word: 'checked',
        pronunciation: '/tʃɛkt/',
        definition: 'Looked at something carefully to learn more.',
        exampleSentence: 'She checked under the bed for her shoes.',
        iconEmoji: '🔍',
      },
      muddy: {
        word: 'muddy',
        pronunciation: '/ˈmʌdi/',
        definition: 'Covered with wet, soft dirt or soil.',
        exampleSentence: 'His boots were muddy after the rain.',
        iconEmoji: '🌧️',
      },
      'paw prints': {
        word: 'paw prints',
        pronunciation: '/pɔː prɪnts/',
        definition: 'Footprints made by an animal with paws, like a dog or cat.',
        exampleSentence: 'We followed the puppy’s paw prints in the snow.',
        iconEmoji: '🐾',
      },
    },
    hasClueToCollect: true,
    clue: allClueCards[1],
    hotspots: [
      {
        id: 'hs-tracks',
        name: 'Muddy Paw Prints',
        description: 'Fresh muddy dog prints on the walkway stones! They point toward the sidewalk.',
        xPercent: 55,
        yPercent: 84,
        isMainClue: true,
      },
      {
        id: 'hs-emma-search',
        name: 'Emma Checking the Trail',
        description: 'Emma looks down at the walkway to follow where Coco ran.',
        xPercent: 41,
        yPercent: 48,
        isMainClue: false,
      },
    ],
    questionAfter: {
      id: 'q1',
      afterPage: 2,
      questionNumber: 1,
      questionType: 'fact',
      questionText: 'Where did the muddy paw prints lead?',
      options: [
        {
          id: 'opt2',
          text: 'Inside the kitchen',
          iconEmoji: '🍽️',
          isCorrect: false,
        },
        {
          id: 'opt1',
          text: 'Toward the sidewalk',
          iconEmoji: '🚶',
          isCorrect: true,
        },
        {
          id: 'opt3',
          text: 'Up a tall tree',
          iconEmoji: '🌲',
          isCorrect: false,
        },
      ],
      hintText: 'Look at the ground in the illustration! The footprints lead outside through the gate.',
      hintEmoji: '🐾',
      explanation: 'Great job! The footprints clearly lead past the gate toward the sidewalk.',
    },
  },

  // Page 3
  {
    pageNumber: 3,
    title: 'The Jingling Bell',
    locationName: 'Maple Street Bakery',
    illustration: bakerySceneImage,
    illustrationAlt: 'Emma outside the modern bakery talking to friendly baker Mrs. Higgins',
    storyText: 'Emma visited the bakery. Mrs. Higgins said, "I heard a silver collar bell jingling near the bakery window!"',
    keyWords: {
      bakery: {
        word: 'bakery',
        pronunciation: '/ˈbeɪkəri/',
        definition: 'A shop where bread, rolls, and cakes are baked and sold.',
        exampleSentence: 'The bakery smelled of fresh warm bread.',
        iconEmoji: '🥐',
      },
      collar: {
        word: 'collar',
        pronunciation: '/ˈkɒlər/',
        definition: 'A leather or cloth strap worn around a dog’s neck.',
        exampleSentence: 'Coco has a red collar with a shiny tag.',
        iconEmoji: '🐕',
      },
      jingling: {
        word: 'jingling',
        pronunciation: '/ˈdʒɪŋɡlɪŋ/',
        definition: 'Making a light, ringing sound like small metal bells.',
        exampleSentence: 'The keys were jingling in her pocket.',
        iconEmoji: '🔔',
      },
    },
    hasClueToCollect: true,
    clue: allClueCards[2],
    hotspots: [
      {
        id: 'hs-baker',
        name: 'Mrs. Higgins at the Bakery',
        description: 'Mrs. Higgins in her baker apron points down the street: "A little brown dog jingled past with a bell!"',
        xPercent: 65,
        yPercent: 48,
        isMainClue: true,
      },
      {
        id: 'hs-emma-bakery',
        name: 'Emma Outside Bakery',
        description: 'Emma is asking if anyone saw her dog running past.',
        xPercent: 32,
        yPercent: 56,
        isMainClue: false,
      },
    ],
  },

  // Page 4
  {
    pageNumber: 4,
    title: 'The Yellow Sign',
    locationName: 'School Crosswalk',
    illustration: crosswalkSceneImage,
    illustrationAlt: 'Sam the crossing guard holding a yellow STOP sign and pointing across the street to Sunny Park for Emma',
    storyText: 'Sam at the crosswalk waved his yellow sign. "A brown fluffy dog ran toward Sunny Park!"',
    keyWords: {
      crosswalk: {
        word: 'crosswalk',
        pronunciation: '/ˈkrɒswɔːk/',
        definition: 'A marked path on a road where people can safely cross.',
        exampleSentence: 'Always look both ways before using the crosswalk.',
        iconEmoji: '🚸',
      },
      fluffy: {
        word: 'fluffy',
        pronunciation: '/ˈflʌfi/',
        definition: 'Very soft and covered with thick, gentle fur.',
        exampleSentence: 'The puppy has warm, fluffy fur.',
        iconEmoji: '🐶',
      },
      sign: {
        word: 'sign',
        pronunciation: '/saɪn/',
        definition: 'A board or poster with words or symbols giving information.',
        exampleSentence: 'The yellow sign told cars to stop.',
        iconEmoji: '🛑',
      },
    },
    hasClueToCollect: true,
    clue: allClueCards[3],
    hotspots: [
      {
        id: 'hs-sam',
        name: 'Sam & His Yellow STOP Sign',
        description: 'Sam holds his yellow STOP sign and points toward Sunny Park: "He ran that way!"',
        xPercent: 42,
        yPercent: 43,
        isMainClue: true,
      },
      {
        id: 'hs-emma-crosswalk',
        name: 'Emma at the Crosswalk',
        description: 'Emma is listening carefully as Sam points across the street to Sunny Park.',
        xPercent: 24,
        yPercent: 56,
        isMainClue: false,
      },
    ],
    questionAfter: {
      id: 'q2',
      afterPage: 4,
      questionNumber: 2,
      questionType: 'fact',
      questionText: 'Where did Sam say the fluffy dog ran?',
      options: [
        {
          id: 'opt2',
          text: 'Into the supermarket',
          iconEmoji: '🛒',
          isCorrect: false,
        },
        {
          id: 'opt3',
          text: 'Back to school',
          iconEmoji: '📚',
          isCorrect: false,
        },
        {
          id: 'opt1',
          text: 'Toward Sunny Park',
          iconEmoji: '🌳',
          isCorrect: true,
        },
      ],
      hintText: 'Listen to Sam’s words: "A brown fluffy dog ran toward..."',
      hintEmoji: '🌳',
      explanation: 'Awesome detective work! Sam the crossing guard pointed directly toward Sunny Park.',
    },
  },

  // Page 5
  {
    pageNumber: 5,
    title: 'The Blue Ribbon',
    locationName: 'Sunny Park Entrance',
    illustration: parkBridgeSceneImage,
    illustrationAlt: 'Emma entering Sunny Park and spotting a blue ribbon on a bush near the bridge path',
    storyText: 'Emma entered Sunny Park. Near a large oak tree, she spotted a blue ribbon caught on a bush.',
    keyWords: {
      spotted: {
        word: 'spotted',
        pronunciation: '/ˈspɒtɪd/',
        definition: 'Noticed or caught sight of something.',
        exampleSentence: 'Emma spotted a colorful butterfly in the grass.',
        iconEmoji: '👀',
      },
      bush: {
        word: 'bush',
        pronunciation: '/bʊʃ/',
        definition: 'A low plant with thick green branches and leaves.',
        exampleSentence: 'The red ball rolled behind the rose bush.',
        iconEmoji: '🌿',
      },
      ribbon: {
        word: 'ribbon',
        pronunciation: '/ˈrɪbən/',
        definition: 'A thin strip of soft material used for tying or decoration.',
        exampleSentence: 'She tied her gift with a silk blue ribbon.',
        iconEmoji: '🎗️',
      },
    },
    hasClueToCollect: true,
    clue: allClueCards[4],
    hotspots: [
      {
        id: 'hs-ribbon',
        name: 'Blue Ribbon on the Bush',
        description: 'A blue ribbon caught in the bush leaves! Coco was running past here toward the bridge.',
        xPercent: 22,
        yPercent: 68,
        isMainClue: true,
      },
      {
        id: 'hs-emma-park',
        name: 'Emma Examining Bush',
        description: 'Emma found the ribbon right along the trail!',
        xPercent: 58,
        yPercent: 66,
        isMainClue: false,
      },
    ],
    questionAfter: {
      id: 'q3',
      afterPage: 5,
      questionNumber: 3,
      questionType: 'fact',
      questionText: 'What clue did Emma spot caught on the bush near the oak tree?',
      options: [
        {
          id: 'opt2',
          text: 'A yellow soccer ball',
          iconEmoji: '⚽',
          isCorrect: false,
        },
        {
          id: 'opt1',
          text: 'A blue ribbon',
          iconEmoji: '🎗️',
          isCorrect: true,
        },
        {
          id: 'opt3',
          text: 'A pair of sunglasses',
          iconEmoji: '🕶️',
          isCorrect: false,
        },
      ],
      hintText: 'Check the story text: "she spotted a _____ caught on a bush."',
      hintEmoji: '🎗️',
      explanation: 'Super detective finding! Emma spotted the blue ribbon caught in the bush branches.',
    },
  },

  // Page 6
  {
    pageNumber: 6,
    title: 'Voices Under the Bridge',
    locationName: 'Wooden Footbridge',
    illustration: parkBridgeSceneImage,
    illustrationAlt: 'Emma approaching the wooden footbridge and listening to sounds from underneath',
    storyText: 'Emma stopped near the wooden bridge. She heard a soft bark and a tiny meow from underneath!',
    keyWords: {
      wooden: {
        word: 'wooden',
        pronunciation: '/ˈwʊdən/',
        definition: 'Made of wood from trees.',
        exampleSentence: 'They sat on a sturdy wooden bench.',
        iconEmoji: '🪵',
      },
      underneath: {
        word: 'underneath',
        pronunciation: '/ˌʌndərˈniːθ/',
        definition: 'Directly below or under something.',
        exampleSentence: 'The puppy hid underneath the dining table.',
        iconEmoji: '⬇️',
      },
      tiny: {
        word: 'tiny',
        pronunciation: '/ˈtaɪni/',
        definition: 'Extremely small in size.',
        exampleSentence: 'A tiny ant walked across the table.',
        iconEmoji: '🐜',
      },
    },
    hasClueToCollect: true,
    clue: allClueCards[5],
    hotspots: [
      {
        id: 'hs-bridge-hollow',
        name: 'Dry Hollow Under the Wooden Bridge',
        description: 'Listen closely! "Woof... meow!" Soft barking and tiny meowing coming from under the wooden bridge!',
        xPercent: 75,
        yPercent: 56,
        isMainClue: true,
      },
      {
        id: 'hs-emma-listening',
        name: 'Emma Listening Closely',
        description: 'Emma stops right by the wooden bridge path and listens to the quiet sounds.',
        xPercent: 58,
        yPercent: 66,
        isMainClue: false,
      },
    ],
  },

  // Page 7
  {
    pageNumber: 7,
    title: 'Found Under the Bridge!',
    locationName: 'Shelter Under Bridge',
    illustration: bridgeDiscoverySceneImage,
    illustrationAlt: 'Emma crouching under the wooden footbridge, smiling as Coco cuddles an injured orange kitten',
    storyText: 'Emma peeked under the bridge. Coco was keeping an injured orange kitten warm and safe!',
    keyWords: {
      peeked: {
        word: 'peeked',
        pronunciation: '/piːkt/',
        definition: 'Looked quickly or secretly from a hiding spot.',
        exampleSentence: 'The children peeked through the door.',
        iconEmoji: '🫣',
      },
      injured: {
        word: 'injured',
        pronunciation: '/ˈɪndʒərd/',
        definition: 'Hurt, in pain, or wounded.',
        exampleSentence: 'The doctor bandaged the injured puppy’s leg.',
        iconEmoji: '🩹',
      },
      shivering: {
        word: 'shivering',
        pronunciation: '/ˈʃɪvərɪŋ/',
        definition: 'Shaking slightly because of cold, fear, or pain.',
        exampleSentence: 'The wet puppy was shivering in the cold breeze.',
        iconEmoji: '❄️',
      },
    },
    hasClueToCollect: false,
    hotspots: [
      {
        id: 'hs-coco',
        name: 'Coco the Brave Dog',
        description: 'Coco is gently resting beside the kitten to keep it warm and protected!',
        xPercent: 54,
        yPercent: 64,
        isMainClue: true,
      },
      {
        id: 'hs-kitten',
        name: 'Injured Orange Kitten',
        description: 'A tiny orange kitten with a hurt paw, safe beside Coco.',
        xPercent: 72,
        yPercent: 70,
        isMainClue: true,
      },
      {
        id: 'hs-emma-relief',
        name: 'Emma Crouching Relieved',
        description: 'Emma found her beloved dog and a new little friend!',
        xPercent: 28,
        yPercent: 54,
        isMainClue: false,
      },
    ],
    questionAfter: {
      id: 'q4',
      afterPage: 7,
      questionNumber: 4,
      questionType: 'inference',
      questionText: 'Why didn’t Coco come home earlier?',
      options: [
        {
          id: 'opt2',
          text: 'Coco forgot where Emma lived',
          iconEmoji: '❓',
          isCorrect: false,
        },
        {
          id: 'opt1',
          text: 'Coco was protecting the hurt kitten',
          iconEmoji: '🛡️',
          isCorrect: true,
        },
        {
          id: 'opt3',
          text: 'Coco was hiding from Emma',
          iconEmoji: '🙈',
          isCorrect: false,
        },
      ],
      hintText: 'Coco stayed loyal by the little kitten’s side until help arrived.',
      hintEmoji: '🐱',
      explanation: 'Spot on! Coco heard the hurt kitten and stayed to keep it warm and protected.',
    },
  },

  // Page 8
  {
    pageNumber: 8,
    title: 'A Hero’s Welcome',
    locationName: 'Heading Home',
    illustration: bridgeDiscoverySceneImage,
    illustrationAlt: 'Emma hugging hero dog Coco tightly, keeping the kitten safe in her sweater',
    storyText: 'Emma hugged Coco tightly. "You are a true hero dog!" Together, they took the kitten to safety.',
    keyWords: {
      hugged: {
        word: 'hugged',
        pronunciation: '/hʌɡd/',
        definition: 'Held someone closely with arms in love or care.',
        exampleSentence: 'Emma hugged her mother with a big smile.',
        iconEmoji: '🤗',
      },
      hero: {
        word: 'hero',
        pronunciation: '/ˈhɪəroʊ/',
        definition: 'Someone admired for their courage, kindness, and helping others.',
        exampleSentence: 'The brave firefighter was a true hero.',
        iconEmoji: '⭐',
      },
      tightly: {
        word: 'tightly',
        pronunciation: '/ˈtaɪtli/',
        definition: 'In a firm, close way with strong hold.',
        exampleSentence: 'She held her dog tightly in her arms.',
        iconEmoji: '🤝',
      },
    },
    hasClueToCollect: false,
  },
];

export const retellingSentenceFrames: RetellingSentenceFrame[] = [
  {
    id: 'frame-1',
    stepName: 'First',
    promptPrefix: 'First, Emma found ',
    promptSuffix: '.',
    correctAnswerText: 'the open gate and muddy paw prints',
    options: [
      {
        id: 'f1-opt2',
        text: 'a shiny spaceship in her garden',
        isCorrect: false,
        feedbackGuide: 'Spaceship? 🚀 Emma is looking for dog clues in her yard! Look for what was left open and what footprints were on the ground.',
      },
      {
        id: 'f1-opt1',
        text: 'the open gate and muddy paw prints',
        isCorrect: true,
      },
      {
        id: 'f1-opt3',
        text: 'a sleeping dragon under her bed',
        isCorrect: false,
        feedbackGuide: 'A sleeping dragon? 🐉 Remember, Emma found tracks leading out from her garden gate!',
      },
    ],
  },
  {
    id: 'frame-2',
    stepName: 'Then',
    promptPrefix: 'Then, she went to ',
    promptSuffix: '.',
    correctAnswerText: 'Sunny Park by following the neighborhood clues',
    options: [
      {
        id: 'f2-opt2',
        text: 'the movie cinema to buy popcorn',
        isCorrect: false,
        feedbackGuide: 'Movie cinema? 🍿 Emma was searching for Coco! Mrs. Higgins and Sam pointed toward the park.',
      },
      {
        id: 'f2-opt3',
        text: 'the airport to take a rocket to Mars',
        isCorrect: false,
        feedbackGuide: 'A rocket to Mars? 🚀 The clues from the bakery and crosswalk led toward Sunny Park!',
      },
      {
        id: 'f2-opt1',
        text: 'Sunny Park by following the neighborhood clues',
        isCorrect: true,
      },
    ],
  },
  {
    id: 'frame-3',
    stepName: 'Finally',
    promptPrefix: 'Finally, she found Coco ',
    promptSuffix: '.',
    correctAnswerText: 'protecting an injured kitten under the wooden bridge',
    options: [
      {
        id: 'f3-opt1',
        text: 'protecting an injured kitten under the wooden bridge',
        isCorrect: true,
      },
      {
        id: 'f3-opt2',
        text: 'eating chocolate cake on a Ferris wheel',
        isCorrect: false,
        feedbackGuide: 'Chocolate cake? 🍫 Dogs shouldn’t eat chocolate! Remember what small animal Coco was protecting.',
      },
      {
        id: 'f3-opt3',
        text: 'swimming with sharks in the deep ocean',
        isCorrect: false,
        feedbackGuide: 'Swimming with sharks? 🦈 Coco was safe under the wooden bridge keeping a kitten warm!',
      },
    ],
  },
];
