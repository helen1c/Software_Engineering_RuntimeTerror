Rad na dokumentaciji pomoću git-a (VAŽNO!):
	
	Ako nemate branch i stvarate ga prvi put (u prijevodu tek počinjete radit na nekom tasku) nastavite od koraka 1.
	Ukoliko imate već kod sebe branch na kojem treba nešto raditi i sad samo nastavljate (devdoc-initiliazie npr.), provjerite je li na branchu "devdoc" ima šta novo, tako što se checkoutate na devdoc lokalno,
		i kucate naredbu "git pull origin devdoc". Ukoliko je bilo promjena, trebat cete ih mergeat sa svojim branchom na kojem ste već radili,
		tako što odete na granu na kojoj radite "npr devdoc-initialize" naredbom "git checkout devdoc-initialize", i pišete "git merge devdoc".
		Ako je bilo nekih konflikata, rješite ih PAŽLJIVO i nastavite s korakom 3.

	1. Ukoliko stvarate prvi put novi branch (znači preuzimate novi task a ne nastavljate raditi na starom)
		onda se kod sebe lokalno "git checkout devdoc", nakon toga obavezno pullajte zadnje promjene sa remote-a (brancha na internetu)
		naredbom "git pull origin devdoc". To će osigurati da imate zadnju verziju brancha devdoc kod sebe lokalno
		
	2. Nakon što ste uradili 1. korak (dobro pazite na naziv brancheva na kojem se nalazite, šta pushate, šta pullate)
		napišite naredbu "git branch" i ona vam MORA pokazati branch "devdoc*". Nakon toga stvorite kod sebe lokalno	
		novi branch na kojem želite raditi, nužno je da se na njega checkoutate iz devdoca. Znači pišete naredbu
		"git branch devdoc-(funkcija koju radite)" npr. "git branch devdoc-initiliazie", i nakon toga "git checkout devdoc-initialize".
		Dvije prethodne naredbe možete napraviti kao jednu tako što napišete "git checkout -b devdoc-initialize".
		Nakon tog koraka provjerite naredbom "git branch" da se nalazite na novostvorenom branchu.
		
	3. Kad se nalazite na svom branchu, pišete, dodajete promjene i spremate promjene (git add ., git commit -m ""),
		i u slučaju da mislite da ste gotovi ili jednostavno to želite imati i na remoteu i prije, napišete naredbu
		"git push origin devdoc-(ime funkcije koju radite)" (VAŽNO!) --> u našem primjeru "git push origin devdoc-initialize" Bitno je da se branch na kojem radite lokalno i branch na koji pushate
		jednako zovu. (Da vam se ne dogodi da sa nekog brancha koji radite bezzveze pushate na master u nepažnji!)
		
	4. Kad ste gotovi, napravite merge request na gitlabu, gdje vam mora pisati da želite prebacivati sa svog brancha koji ste radili,
		u našem primjeru devdoc-initialize --> u branch devdoc.
		
		
		
		