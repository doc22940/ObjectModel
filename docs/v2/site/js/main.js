{

	const links = [...document.querySelectorAll("#menu a[href^='#']")],
		sections = links.map(link => document.querySelector(link.getAttribute("href")));

	document.getElementById("menu-button").onclick = function toggleMenu() {
		document.body.classList.toggle("menu-opened");
	};

	for (let link of links){
		link.addEventListener("focus", function showMenu(){
			document.body.classList.add("menu-opened");
		});
	}

	function selectLink(hash) {
		for (let link of links){
			link.classList.toggle("active", link.getAttribute("href") === hash);
		}
	}

	window.addEventListener("hashchange", function () {
		setTimeout(() => selectLink(location.hash), 1); //delay to trigger after scroll event
	});

	window.addEventListener("scroll", function () {
		let nearest = { section: sections[0], delta: Infinity },
			pos = window.scrollY + window.innerHeight / 6;

		for (let section of sections) {
			let delta = Math.abs(pos - section.offsetTop);
			if (delta < nearest.delta) {
				nearest.section = section;
				nearest.delta = delta;
			}
		}
		selectLink('#' + nearest.section.id);
	});

	for (let trigger of [...document.querySelectorAll("[data-source-trigger]")]) {
		trigger.addEventListener("click", () => {
			let code = trigger.parentElement.querySelector("code[data-source]");
			if(code){
				fetch(code.getAttribute("data-source"))
					.then(res => res.text())
					.then(source => {
						code.textContent = source;
						code.removeAttribute("data-source");
						Prism.highlightElement(code);
					})
			}
		})

	}

}