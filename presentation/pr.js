const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);

const contents = qs(".contents");
const root = qs(":root");
const zoomIn = qs(".zoomIn");
const zoomOut = qs(".zoomOut");
const important = qsa(".important");
const pageDisplay = qs('.pageDisplay');

const next = qs(".next");
const back = qs(".back");

let currentPage = 0;
let highlighted = false;

// modifyable presentation

let textForLocalStorage = null;
let toStore = "Christian";

// JS DEMO BOX

// document.addEventListener('DOMContentLoaded', (e) => {
//     if (Number(localStorage.getItem("lastPage"))) {
//         currentPage = Number(localStorage.getItem("lastPage"))
//         pageHandler()
//     }
//     console.log('set last page as ' + Number(localStorage.getItem("lastPage")))
// })

//

const cppCode1 = `
    #include &ltiostream&gt
    #include &ltstring&gt
    #include &ltvector&gt

    struct Student {
        std::string name;
        int age;
    };

    int main() {
        Student student1;
        student1.name = "Christian";
        student1.age = 19;

        std::cout << "Hello " << student1.name << " you are " << student1.age
            << " years old." << std::endl;

        return 0;
    }
`;

const pages = [
  {
    title: `<p class="contentTitle">JavaScript</p>`,
    code: `<p class="text">let array = [1, 2, 3, 4, 5]; <span class="comments">// output is the number 3</span></p>
            <p class="text">console.log(array[2]);</p>
            <p class="subText">An array is an ordered collection of values, where each value is stored at a numbered position called an <span class="highlight important">index</span>. In this scenario, it will output the number 3. Why? Because indexes in JavaScript starts at 0.</p>
        </div>`,
  },
  {
    title: `<p class="contentTitle">Arrays</p>`,
    code: `<p class="subText">Though <span class="highlight important">JavaScript</span> is abstract, there's a lot more happening under the hood. JS arrays are actually objects behind the scenes.</p> <br>
        <p class="subText">In C++, we can see the truth due trough strictness and the way you manage your own memory. </p>
        </div>`,
  },
  {
    title: `<p class="contentTitle">C++ Arrays</p>`,
    code: `<p class=subText>In C++, first you define a structure: </p>
        <p class="subText codeBlock">${cppCode1}</p>
        `,
  },
  {
    title: `<p class="contentTitle">What are Arrays?</p>`,
    code: `<p class="subText">arrays are linear if it only has a <span class="highlight important">single row</span> or a list. <br> <br> It becomes none linear if it can have <span class="highlight important">rows and columns</span>. Think of a normal parking lot(linear) and compare it to a multi-story parking lot or a calendar (non-linear/2d).</p>
`,
  },
  {
    title: `<p class="contentTitle">Comparison</p>`,
    code: `<p class="subText">C++ is a <span class="highlight important">low-level language</span> for a reason. it doesn't literally mean that low is bad, what it means is it's <span class="highlight important">closer to the hardware</span> and that's the reason why it's one of the fastest language available because it lets you <span class="highlight important">control the RAM</span>. It is type-strict, it throws an error when assigning a string "Hello" when you declared an int (integer). <br> <br> 
    there are also <span class="highlight important">mid-level languages</span> like JavaScript, meaning it's a bit close to the hardware and at the same time it is also <span class="highlight important">human-readable</span>. Unlike C++, it doesn't care about types that much, you can <span class="highlight important">assign anything</span> you want to a variable and it also <span class="highlight important">has a garbage collector</span>, meaning you don't have to control the ram usage manually. And finally, the <span class="highlight important">high-level languages</span> like <span class="highlight important">python</span> where it's basically writing a script on <span class="highlight important">plain english or human language</span>. It focus on what to do rather than how to do it</p>`,
  },
  {
    title: `<p class="contentTitle">Non-linear Arrays</p>`,
    code: `<p class="subText">let's say you have this: </p>
    <br>
    <p class="subText codeBlock">
    const arr = [
    [10, 20, 30],
    ['apple', 'banana', 'cherry'],
    ['aba', 'esmalde']
]

console.log(arr[2][0]) <br></p> <p class="subText"> What is the result after specifying the indexes? </p>`,
  },
  {
    title: `<p class="contentTitle">Usage of Arrays</p>`,
    code: `<p class="subText">In this example, i'll show you how arrays work from in and out using a task manager.</p>
    <div class="taskDisplay"></div>
    <input type="text" class="taskManager" placeholder="Place a task"></input>`,
  },
  {
    title: `<p class="contentTitle">Linear Arrays (1d)</p>`,
    code: `<p class="subText">As you can see in this image, an array is linear, and it's true. Especially in C++, because in JavaScript an array is actually an object in disguise.</p>
    <img src="../images/ClassificationofDataStructure-660x347.jpg" alt="Data Structure" class="newImage">`,
  },
  {
    title: `<p class="contentTitle">C++ Arrays (Linear)</p>`,
    code: `<p class="subText">This is a C++ script of an actual array, which is struct(structure).</p>
    <p class="subText codeBlock">
        #include &ltiostream&gt
        #include &ltstring&gt

        struct person {
            std::string name;
            int age;
        };

        int main() {
            person person1;
            std::cout << "What's your name?" << std::endl;
            std::cin >> person1.name;
            std::cout << "How old are you?" << std::endl;
            std::cin >> person1.age;
            return 0;
        }
    </p>
    <p class="subText">As you can see, you cannot push another value since the structure <span class="highlight important">"person"</span> is specified to only have <span class="highlight important">string name</span> and <span class="highlight important">int age</span>. You can't do person1.gpa since you will <span class="highlight important">leak memory</span>.</p>`,
  },
];

next.addEventListener("click", () => {
  contents.style.opacity = 0;
  currentPage++;
  // Number(localStorage.setItem("lastPage", currentPage));
  pageHandler();
});

back.addEventListener("click", () => {
  contents.style.opacity = 0;
  currentPage--;
  // Number(localStorage.setItem("lastPage", currentPage));
  pageHandler();
});

function pageHandler() {
  setTimeout(() => {
    pageDisplay.textContent = `Page ${(currentPage + 1)}`
    console.log(
      currentPage +
        "st page & local storage value: " +
        Number(localStorage.getItem("lastPage")),
    );
    contents.innerHTML = "";
    if (pages[currentPage]) {
      contents.innerHTML = `${pages[currentPage].title} ${pages[currentPage].code}`;
    } else {
      contents.innerHTML = `        <p class="contentTitle">THE END</p>
    <p class="text">Thank you for listening! Are there any questions or clarifications?</p>
    <p class="subText">Made by: Christian Tiquil.</p>`;
    }

    const newImportant = qsa(".important");
    const newSubText = qs(".subText");

    newSubText?.addEventListener("animationend", () => {
      newImportant.forEach((text) => {
        text.classList.add("highlight");
      });
    });

    contents.style.opacity = 1;

    const taskManager = qs(".taskManager");
    const taskDisplay = qs(".taskDisplay");

    let num = 0;

    taskManager?.addEventListener("keydown", (e) => {
      console.log("task manager enabled");
      if (e.key !== "Enter") return;

      num++;
      taskHandler(taskManager.value, taskDisplay, num);
      console.log(`processed task`);
      taskArr.push(taskManager.value);
      console.log(taskArr);
      taskManager.value = '';
    });
  }, 1000);
}

qs(".subText").addEventListener("animationend", (e) => {
  if (!highlighted) {
    important.forEach((text) => {
      text.classList.add("highlight");
    });
  }
  highlighted = true;
});

zoomIn.addEventListener("click", () => {
  let size = getComputedStyle(root)
    .getPropertyValue("--default-fontsize")
    .trim();

  let numericSize = parseFloat(size);
  numericSize += 1;

  root.style.setProperty("--default-fontsize", `${numericSize}px`);
});

zoomOut.addEventListener("click", () => {
  let size = getComputedStyle(root)
    .getPropertyValue("--default-fontsize")
    .trim();

  let numericSize = parseFloat(size);
  numericSize -= 1;

  root.style.setProperty("--default-fontsize", `${numericSize}px`);
});

function typeAnim(text) {
  const toType = text.textContent;
  text.innerHTML = "";

  for (let i = 0; i < toType.length; i++) {
    setTimeout(() => {
      text.innerHTML += toType[i];
    }, i * 50);
  }
}

// let arr = [1, 2, 3 , 4, 5];

// arr.push(6);

// console.log(arr)

// TASK MANAGER

let taskArr = [];

function taskHandler(task, display, num) {
  const el = document.createElement("div");
  el.textContent = `task ${num}: ${task}`;

  display.appendChild(el);
  console.log(`appended element`);
}

// let newArray = [
//     [10, 20, 30],           //0
//     ['Apple', 'Banana'],    //1
//     ['Aba', 'Esmalde', 'Hello World']      //2
// ]

// newArray[2].push(["Amorganda"])

// console.log(newArray)
