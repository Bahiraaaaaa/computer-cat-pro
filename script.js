
/* ======================================
   Macaron Kitty — Game Engine
   ====================================== */

(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);

  const scene = $("#scene");
  const cat = $("#cat");
  const catSprite = $("#catSprite");
  const catBubble = $("#catBubble");
  const itemsLayer = $("#itemsLayer");
  const effectsLayer = $("#effectsLayer");
  const toyGrid = $("#toyGrid");
  const mood = $("#mood");
  const sceneHint = $("#sceneHint");
  const selectionHint = $("#selectionHint");
  const affectionDisplay = $("#affection");
  const interactionsDisplay = $("#interactions");
  const itemCountDisplay = $("#itemCount");
  const liveMessage = $("#liveMessage");
  const catNameInput = $("#catNameInput");
  const catNameDisplay = $("#catNameDisplay");
  const angerIndicator = $("#angerIndicator");

  const toys = [
    {
      id: "milk", emoji: "🥛", name: "香濃牛奶",
      category: "food", consume: true,
      duration: 3000, action: "drink",
      message: "咕嚕咕嚕～好喝！", effect: "💗",
      tip: "小貓會在牛奶旁喝上三秒，然後開心地冒出愛心！"
    },
    {
      id: "fish", emoji: "🐟", name: "新鮮小魚",
      category: "food", consume: true,
      duration: 2300, action: "eat",
      message: "魚魚最棒了！", effect: "💖",
      tip: "小貓會開心吃魚，結束後送你一顆愛心。"
    },
    {
      id: "cookie", emoji: "🍪", name: "小餅乾",
      category: "food", consume: true,
      duration: 1900, action: "eat",
      message: "喀滋喀滋～", effect: "✨",
      tip: "香香的小餅乾，讓小貓開心吃點心。"
    },
    {
      id: "strawberry", emoji: "🍓", name: "甜甜草莓",
      category: "food", consume: true,
      duration: 1800, action: "sniff",
      message: "聞起來好香！", effect: "⭐",
      tip: "小貓會好奇地聞一聞草莓。"
    },
    {
      id: "cake", emoji: "🧁", name: "奶油蛋糕",
      category: "food", consume: true,
      duration: 2200, action: "sniff",
      message: "這是什麼甜甜的？", effect: "💗",
      tip: "讓小貓聞聞可愛的小蛋糕。"
    },
    {
      id: "yarn", emoji: "🧶", name: "毛線球",
      category: "toy", consume: false,
      duration: 2400, action: "play",
      message: "抓到你了！", effect: "✨",
      tip: "小貓會興奮地撥弄毛線球。"
    },
    {
      id: "bear", emoji: "🧸", name: "泰迪熊",
      category: "toy", consume: false,
      duration: 2200, action: "cuddle",
      message: "抱抱～好溫暖！", effect: "💗",
      tip: "小貓會依偎著泰迪熊撒嬌。"
    },
    {
      id: "feather", emoji: "🪶", name: "柔軟羽毛",
      category: "toy", consume: false,
      duration: 2300, action: "play",
      message: "飛呀飛呀！", effect: "✨",
      tip: "小貓會伸出爪子追著羽毛玩。"
    },
    {
      id: "mouse", emoji: "🐭", name: "玩具老鼠",
      category: "toy", consume: false,
      duration: 2500, action: "play",
      message: "喵！抓到了！", effect: "⭐",
      tip: "小貓會撲向玩具老鼠。"
    },
    {
      id: "butterfly", emoji: "🦋", name: "夢幻蝴蝶",
      category: "toy", consume: false,
      duration: 2600, action: "play",
      message: "蝴蝶飛好高！", effect: "🦋",
      tip: "小貓會抬頭追逐蝴蝶。"
    },
    {
      id: "ball", emoji: "🎾", name: "綠色小球",
      category: "toy", consume: false,
      duration: 2200, action: "play",
      message: "再玩一次！", effect: "⭐",
      tip: "小貓會拍打小球，玩得很開心。"
    },
    {
      id: "paw", emoji: "🐾", name: "貓掌玩具",
      category: "toy", consume: false,
      duration: 1700, action: "play",
      message: "喵掌出擊！", effect: "💖",
      tip: "小貓會伸爪拍拍可愛的貓掌玩具。"
    },
    {
      id: "yo-yo", emoji: "🪀", name: "溜溜球",
      category: "toy", consume: false,
      duration: 2100, action: "play",
      message: "這個好有趣！", effect: "✨",
      tip: "小貓會追著溜溜球跑。"
    },
    {
      id: "bed", emoji: "🛏️", name: "柔軟小床",
      category: "rest", consume: false,
      duration: 3000, action: "sleep",
      message: "呼嚕……好睏……", effect: "💤",
      tip: "小貓會在小床旁安心休息。"
    },
    {
      id: "plant", emoji: "🪴", name: "迷你盆栽",
      category: "nature", consume: false,
      duration: 1700, action: "sniff",
      message: "新朋友你好！", effect: "🌱",
      tip: "小貓會好奇地嗅聞小盆栽。"
    },
    {
      id: "flower", emoji: "🌸", name: "櫻花",
      category: "nature", consume: false,
      duration: 1700, action: "sniff",
      message: "花花好漂亮！", effect: "🌸",
      tip: "小貓會聞聞花香，開心地搖搖尾巴。"
    },
    {
      id: "heart", emoji: "💖", name: "魔法愛心",
      category: "magic", consume: false,
      duration: 1800, action: "love",
      message: "最喜歡你了！", effect: "💗",
      tip: "魔法愛心會讓小貓進入撒嬌模式。"
    },
    {
      id: "star", emoji: "⭐", name: "閃亮星星",
      category: "magic", consume: false,
      duration: 1800, action: "wonder",
      message: "哇！亮晶晶！", effect: "✨",
      tip: "小貓會仰頭看著閃閃發亮的星星。"
    },
    {
      id: "bubble", emoji: "🫧", name: "夢幻泡泡",
      category: "magic", consume: false,
      duration: 2200, action: "play",
      message: "泡泡別跑！", effect: "🫧",
      tip: "小貓會追逐夢幻泡泡。"
    },
    {
      id: "ribbon", emoji: "🎀", name: "粉色蝴蝶結",
      category: "magic", consume: false,
      duration: 2000, action: "cuddle",
      message: "今天也很可愛！", effect: "💗",
      tip: "小貓會開心地玩弄蝴蝶結。"
    },
    {
      id: "coffee", emoji: "☕", name: "苦苦咖啡",
      category: "food", consume: true,
      duration: 1200, action: "forbidden",
      message: "我不能吃這個！", effect: "💢",
      tip: "咖啡不適合貓咪！小貓會拒絕並丟掉它，親密度 -2。"
    },
    {
      id: "chocolate", emoji: "🍫", name: "濃郁巧克力",
      category: "food", consume: true,
      duration: 1200, action: "forbidden",
      message: "我不能吃這個！", effect: "💢",
      tip: "巧克力對貓咪有害！小貓會拒絕並丟掉它，親密度 -2。"
    }
  ];

  const categoryNames = {
    food: "點心",
    toy: "玩具",
    rest: "休息",
    nature: "自然",
    magic: "魔法"
  };

  const state = {
    x: 50,
    y: 58,
    mode: "idle",
    selectedToy: null,
    affection: 0,
    interactions: 0,
    objects: [],
    nextId: 1,
    target: null,
    movementTimer: null,
    movementFrame: null,
    actionTimer: null,
    generation: 0,
    lastToy: null,
    started: false,
    catName: "奶油",
    snackCount: 0,
    growthLevel: 0
  };

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  // ---------- Utilities ----------

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function wait(ms) {
    return new Promise(resolve => {
      state.actionTimer = window.setTimeout(resolve, ms);
    });
  }

  function announce(message) {
    liveMessage.textContent = "";
    window.setTimeout(() => {
      liveMessage.textContent = message;
    }, 20);
  }

  function setMood(text) {
    mood.textContent = text;
  }

  function setBubble(text) {
    catBubble.textContent = text || "";
  }

  function updateStats() {
    affectionDisplay.textContent = state.affection;
    interactionsDisplay.textContent = state.interactions;
    itemCountDisplay.textContent =
      `場景物品：${state.objects.length}`;
    angerIndicator.classList.toggle("is-visible", state.affection < 0);
  }

  function updateCatName() {
    const name = state.catName.trim() || "奶油";
    state.catName = name;
    catNameDisplay.textContent = `${name}的小房間`;
    cat.setAttribute("aria-label", `${name}正在活動`);
  }

  catNameInput.addEventListener("input", () => {
    state.catName = catNameInput.value.slice(0, 12);
    updateCatName();
  });

  function updateCatGrowth() {
    const nextLevel = Math.min(3, Math.floor(state.snackCount / 3));
    if (nextLevel <= state.growthLevel) return;

    state.growthLevel = nextLevel;
    const sizes = [64, 76, 88, 100];
    catSprite.style.setProperty("--cat-size", `${sizes[nextLevel]}px`);

    const messages = ["", "🌱 長大一點了！", "🌷 又長大了！", "👑 巨大貓咪！"];
    scene.querySelector(".growth-badge")?.remove();

    const badge = document.createElement("div");
    badge.className = "growth-badge";
    badge.textContent = messages[nextLevel];
    scene.append(badge);

    spawnEffects(state.x, state.y - 10, ["✨", "💖", "⭐"]);
    announce(`${state.catName}長大了！目前成長階段 ${nextLevel}。`);
  }

  function updateCatPosition() {
    cat.style.left = `${state.x}%`;
    cat.style.top = `${state.y}%`;
  }

  function setCatAnimation(animation) {
    catSprite.classList.remove(
      "is-walking",
      "is-eating",
      "is-playing",
      "is-sleeping",
      "is-happy",
      "is-sniffing"
    );

    if (animation) {
      catSprite.classList.add(animation);
    }
  }

  function clearTimer(name) {
    if (state[name] !== null) {
      window.clearTimeout(state[name]);
      state[name] = null;
    }
  }

  function stopMovement() {
    clearTimer("movementTimer");

    if (state.movementFrame !== null) {
      cancelAnimationFrame(state.movementFrame);
      state.movementFrame = null;
    }

    setCatAnimation("");
  }

  function getScenePoint(event) {
    const rect = scene.getBoundingClientRect();

    return {
      x: Math.max(
        5, Math.min(95, ((event.clientX - rect.left) / rect.width) * 100)
      ),
      y: Math.max(
        18, Math.min(84, ((event.clientY - rect.top) / rect.height) * 100)
      )
    };
  }

  function distance(a, b) {
    const dx = a.x - b.x;
    const dy = (a.y - b.y) * (scene.clientHeight / scene.clientWidth);
    return Math.hypot(dx, dy);
  }

  // ---------- Toy menu ----------

  function renderToys(category = "all") {
    toyGrid.replaceChildren();

    toys
      .filter(toy => category === "all" || toy.category === category)
      .forEach(toy => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "toy-card";
        button.draggable = true;
        button.dataset.toyId = toy.id;
        button.setAttribute(
          "aria-label",
          `${toy.name}，${toy.consume ? "消耗品" : "可重複使用"}，點選後放置`
        );

        const emoji = document.createElement("span");
        emoji.className = "toy-emoji";
        emoji.textContent = toy.emoji;

        const name = document.createElement("span");
        name.className = "toy-name";
        name.textContent = toy.name;

        const kind = document.createElement("span");
        kind.className = "toy-kind";
        kind.textContent = categoryNames[toy.category];

        button.append(emoji, name, kind);

        button.addEventListener("click", () => {
          selectToy(toy.id);
        });

        button.addEventListener("dragstart", event => {
          state.selectedToy = toy.id;
          event.dataTransfer.setData("text/plain", toy.id);
          event.dataTransfer.effectAllowed = "copy";
          updateSelectedButton();
          selectionHint.textContent =
            `把 ${toy.emoji} ${toy.name} 拖進花園吧！`;
        });

        toyGrid.append(button);
      });

    updateSelectedButton();
  }

  function updateSelectedButton() {
    toyGrid.querySelectorAll(".toy-card").forEach(button => {
      const selected =
        button.dataset.toyId === state.selectedToy;

      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  function selectToy(id) {
    const toy = toys.find(item => item.id === id);
    if (!toy) return;

    state.selectedToy = id;
    updateSelectedButton();

    selectionHint.textContent =
      `${toy.emoji} ${toy.name}：${toy.tip}`;

    sceneHint.textContent =
      `點擊花園，把 ${toy.emoji} 放在喜歡的位置！`;

    announce(`已選擇${toy.name}。請點擊花園放置。`);
  }

  document.querySelectorAll(".category-tab").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".category-tab").forEach(tab => {
        tab.classList.remove("active");
        tab.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      renderToys(button.dataset.category);
    });
  });

  // ---------- Placing objects ----------

  function placeToy(id, point) {
    const toy = toys.find(item => item.id === id);
    if (!toy) return;

    const object = {
      instanceId: state.nextId++,
      toy,
      x: point.x,
      y: point.y,
      done: false,
      busy: false,
      element: null
    };

    const element = document.createElement("div");
    element.className = "placed-item";
    element.style.left = `${object.x}%`;
    element.style.top = `${object.y}%`;
    element.setAttribute("role", "img");
    element.setAttribute("aria-label", toy.name);

    const emoji = document.createElement("span");
    emoji.textContent = toy.emoji;

    const label = document.createElement("span");
    label.className = "item-label";
    label.textContent = toy.name;

    element.append(emoji, label);
    object.element = element;

    itemsLayer.append(element);
    state.objects.push(object);

    updateStats();

    sceneHint.textContent = `${toy.emoji} 已放好，小貓要來看看了！`;
    announce(`已放置${toy.name}。`);

    if (state.mode === "idle" || state.mode === "walking") {
      clearTimer("movementTimer");

      if (state.movementFrame !== null) {
        cancelAnimationFrame(state.movementFrame);
        state.movementFrame = null;
      }

      setCatAnimation("");
      state.mode = "idle";
      processNextObject();
    }
  }

  scene.addEventListener("click", event => {
    if (!state.selectedToy) return;

    const point = getScenePoint(event);
    const id = state.selectedToy;

    placeToy(id, point);
    state.selectedToy = null;
    updateSelectedButton();

    sceneHint.textContent = "物品已放置，看看小貓的反應吧！";
  });

  scene.addEventListener("dragover", event => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "copy";
    }
  });

  scene.addEventListener("drop", event => {
    event.preventDefault();

    const id = event.dataTransfer?.getData("text/plain");
    if (!id || !toys.some(toy => toy.id === id)) return;

    // 阻止同一次拖放被場景 click 再次處理。
    state.selectedToy = null;
    updateSelectedButton();
    placeToy(id, getScenePoint(event));
  });

  // ---------- Cat movement ----------

  function scheduleWander(delay = random(900, 2200)) {
    clearTimer("movementTimer");

    if (state.mode !== "idle") return;

    state.movementTimer = window.setTimeout(() => {
      if (state.mode !== "idle") return;

      const target = {
        x: random(12, 88),
        y: random(35, 78)
      };

      moveCatTo(target, () => {
        if (state.mode !== "idle") return;

        setMood("☀️ 慢慢散步中");
        setBubble(Math.random() < 0.3 ? "喵～" : "");

        scheduleWander(random(900, 2600));
      }, "walking");
    }, delay);
  }

  function moveCatTo(target, onComplete, animation = "walking") {
    if (state.mode === "interacting") return;

    stopMovement();
    state.mode = "walking";
    setMood("🐾 正在走路");
    setCatAnimation("is-walking");

    const start = {
      x: state.x,
      y: state.y
    };

    const dist = distance(start, target);
    const duration = reducedMotion.matches
      ? 20
      : Math.max(550, Math.min(2800, dist * 24));

    const startedAt = performance.now();

    // 依照行進方向決定貓咪面向。
    catSprite.style.setProperty(
      "--facing",
      target.x < start.x ? "-1" : "1"
    );

    function frame(now) {
      if (state.mode !== "walking") return;

      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = progress * progress * (3 - 2 * progress);

      state.x = start.x + (target.x - start.x) * eased;
      state.y = start.y + (target.y - start.y) * eased;

      updateCatPosition();

      if (progress < 1) {
        state.movementFrame = requestAnimationFrame(frame);
      } else {
        state.movementFrame = null;
        state.x = target.x;
        state.y = target.y;
        updateCatPosition();
        setCatAnimation("");

        if (onComplete) onComplete();
      }
    }

    state.movementFrame = requestAnimationFrame(frame);
  }

  // ---------- Interaction queue ----------

  function getNextObject() {
    const pending = state.objects.filter(
      object => !object.done && !object.busy
    );

    if (!pending.length) return null;

    // 每次選擇離貓咪最近的待互動物品。
    pending.sort((a, b) =>
      distance(state, a) - distance(state, b)
    );

    return pending[0];
  }

  function processNextObject() {
    if (state.mode === "interacting" || state.mode === "walking") {
      return;
    }

    const object = getNextObject();

    if (!object) {
      state.target = null;
      state.mode = "idle";
      setMood("☀️ 自由漫步中");
      setBubble("");
      scheduleWander();
      return;
    }

    state.target = object;
    object.busy = true;
    object.element.classList.add("is-target");

    const side = object.x >= state.x ? -1 : 1;
    const approach = {
      x: Math.max(8, Math.min(92, object.x + side * 7)),
      y: Math.max(25, Math.min(82, object.y))
    };

    moveCatTo(approach, () => {
      if (state.mode !== "walking") return;
      startInteraction(object);
    }, "walking");
  }

  async function startInteraction(object) {
    const toy = object.toy;
    const generation = state.generation;

    clearTimer("movementTimer");

    state.mode = "interacting";
    setMood(`💗 正在和${toy.name}互動`);
    setBubble(toy.message);

    object.element.classList.remove("is-target");

    const animations = {
      drink: "is-eating",
      eat: "is-eating",
      play: "is-playing",
      sleep: "is-sleeping",
      sniff: "is-sniffing",
      cuddle: "is-happy",
      love: "is-happy",
      wonder: "is-happy",
      forbidden: "is-happy"
    };

    setCatAnimation(animations[toy.action] || "is-happy");

    const effect = {
      drink: "💗",
      eat: "💖",
      play: toy.effect,
      sleep: "💤",
      sniff: toy.effect,
      cuddle: "💗",
      love: "💖",
      wonder: "✨"
    }[toy.action] || toy.effect;

    // 互動開始時給予即時視覺回饋。
    if (toy.action === "forbidden") {
      setBubble("嗯？這個不行！");
    } else if (toy.action === "drink" || toy.action === "eat") {
      spawnEffects(object.x, object.y, ["✨", "💗"]);
    } else if (toy.action === "sleep") {
      spawnEffects(state.x, state.y - 6, ["💤", "💤"]);
    } else {
      spawnEffects(state.x, state.y - 5, [effect]);
    }

    await wait(toy.duration);

    // 避免重置遊戲前的非同步互動污染新遊戲。
    if (generation !== state.generation) return;

    if (toy.action === "forbidden") {
      object.done = true;
      object.busy = false;
      object.element.classList.add("is-used");
      await wait(300);

      if (generation !== state.generation) return;

      object.element.remove();
      state.objects = state.objects.filter(
        item => item.instanceId !== object.instanceId
      );

      state.affection -= 2;
      state.interactions += 1;
      updateStats();

      setCatAnimation("is-happy");
      setBubble("我不能吃這個！");
      setMood("💢 這個不能吃！");
      sceneHint.textContent = `${toy.emoji} 被丟掉了！親密度 -2`;
      spawnEffects(state.x, state.y - 8, ["💨", "💢"]);
      announce(`${state.catName}說：我不能吃這個！親密度減少 2。`);

      await wait(1200);
      if (generation !== state.generation) return;

      setBubble("");
      setCatAnimation("");
      state.target = null;
      state.mode = "idle";
      processNextObject();
      return;
    }

    object.done = true;
    object.busy = false;

    if (toy.consume) {
      object.element.classList.add("is-used");
      await wait(300);

      if (generation !== state.generation) return;

      object.element.remove();
      state.objects = state.objects.filter(
        item => item.instanceId !== object.instanceId
      );
    } else {
      // 可重複使用的玩具留在原位。
      object.element.classList.remove("is-target");
    }

    state.affection += toy.action === "love" ? 3 : 1;
    state.interactions += 1;
    state.lastToy = toy.id;

    if (toy.category === "food" &&
        (toy.action === "eat" || toy.action === "drink")) {
      state.snackCount += 1;
      updateCatGrowth();
    }

    updateStats();

    setCatAnimation("is-happy");
    setBubble(
      toy.action === "sleep" ? "呼嚕～" : "好開心！"
    );

    spawnEffects(
      state.x,
      state.y - 8,
      toy.action === "sleep"
        ? ["💤", "💤", "✨"]
        : ["💗", "💖", "✨", toy.effect]
    );

    setMood("🥰 幸福滿滿！");
    sceneHint.textContent =
      `${toy.emoji} ${toy.name}：互動完成！`;

    announce(
      `小貓完成${toy.name}互動。親密度 ${state.affection}，互動次數 ${state.interactions}。`
    );

    await wait(700);

    if (generation !== state.generation) return;

    state.target = null;
    state.mode = "idle";
    setCatAnimation("");
    setBubble("");

    updateStats();
    processNextObject();
  }

  // ---------- Effects ----------

  function spawnEffects(x, y, emojis) {
    const fragment = document.createDocumentFragment();

    emojis.forEach((emoji, index) => {
      const effect = document.createElement("span");
      effect.className = "effect";

      if (emoji === "⭐" || emoji === "✨") {
        effect.classList.add("star");
      }

      if (emoji === "🫧") {
        effect.classList.add("bubble");
      }

      effect.textContent = emoji;

      const spread = (index - (emojis.length - 1) / 2) * 25;
      effect.style.left = `calc(${x}% + ${spread}px)`;
      effect.style.top = `calc(${y}% + ${Math.abs(spread) * 0.2}px)`;
      effect.style.animationDelay = `${index * 80}ms`;

      fragment.append(effect);

      effect.addEventListener("animationend", () => {
        effect.remove();
      }, { once: true });
    });

    effectsLayer.append(fragment);
  }

  // ---------- Reset ----------

  function resetGame() {
    // 讓尚未完成的 async 互動立即失效。
    state.generation += 1;

    stopMovement();
    clearTimer("actionTimer");
    clearTimer("movementTimer");

    state.mode = "idle";
    state.x = 50;
    state.y = 58;
    state.selectedToy = null;
    state.affection = 0;
    state.interactions = 0;
    state.objects = [];
    state.nextId = 1;
    state.target = null;
    state.lastToy = null;
    state.catName = "奶油";
    state.snackCount = 0;
    state.growthLevel = 0;
    catNameInput.value = "奶油";
    scene.querySelector(".growth-badge")?.remove();

    itemsLayer.replaceChildren();
    effectsLayer.replaceChildren();

    catSprite.style.setProperty("--facing", "1");
    catSprite.style.setProperty("--cat-size", "64px");
    updateCatName();
    setCatAnimation("");
    setBubble("喵～");
    updateCatPosition();
    updateStats();
    updateSelectedButton();

    setMood("☀️ 自由漫步中");
    sceneHint.textContent = "選一個喜歡的物品，放進花園吧！";
    selectionHint.textContent =
      "小提示：牛奶可以讓小貓幸福地喝上三秒鐘！";

    announce("遊戲已重新開始。");

    scheduleWander(500);
  }

  $("#resetBtn").addEventListener("click", resetGame);

  // ---------- Start ----------

  function init() {
    renderToys();
    updateCatName();
    catSprite.style.setProperty("--facing", "1");
    catSprite.style.setProperty("--cat-size", "64px");
    updateStats();
    updateCatPosition();
    setBubble("喵～");
    setMood("☀️ 自由漫步中");
    scheduleWander(900);
  }

  init();
})();
