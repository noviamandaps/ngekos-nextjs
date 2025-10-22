import Link from "next/link";
import Image from "next/image";

export default function BrowseKos() {
  const kosListings = [
    { name: "Tumbuh Tentram Berada Rumah Nenek", image: "/images/thumbnails/kos_1.png" },
    { name: "Tumbuh Tentram Berada Rumah Nenek", image: "/images/thumbnails/kos_2.png" },
    { name: "Tumbuh Tentram Berada Rumah Nenek", image: "/images/thumbnails/kos_3.png" },
  ];

  return (
    <div
      id="page-container"
      className="mx-auto min-h-screen max-w-[640px] px-5 pb-9 pt-[60px] relative bg-white"
    >
      <div className="background-gradient-green absolute top-0 left-0 bg-gradient-to-b from-[#F2F9E6] to-[#D2EDE4] w-full max-w-screen-sm h-[570px] rounded-b-[60px]"></div>

      <header
        id="navigation-header"
        className="relative mb-[18px] flex h-12 w-full items-center justify-center"
      >
        <Link href="/" className="group absolute left-0">
          <div className="flex h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white p-3 transition-colors group-hover:bg-gray-50">
            <Image src="/images/icons/back-arrow.svg" alt="icons" width={24} height={24} />
          </div>
        </Link>
        <h3 className="flex-grow text-center font-poppins font-semibold text-ngekos-black">
          Browse Koskos
        </h3>
      </header>

      <main id="content-container" className="flex flex-col gap-5 relative">
        <div id="title-container" className="flex h-[78px] w-full">
          <div className="flex-grow font-poppins">
            <h1 className="text-[32px] font-bold text-ngekos-black">Bogor City</h1>
            <p className="text-ngekos-gray">Tersedia 1,304 Kos</p>
          </div>
          <div className="flex w-[65px] flex-col items-center justify-center gap-2 rounded-[22px] bg-white">
            <div className="flex h-6 w-6 shrink-0 overflow-hidden">
              <Image
                className="h-full w-full object-contain"
                src="/images/icons/star.svg"
                alt="star"
                width={24}
                height={24}
              />
            </div>
            <p className="font-poppins text-sm font-bold">4/5</p>
          </div>
        </div>

        <section id="items-container" className="flex flex-col gap-4">
          {kosListings.map((kos, index) => (
            <Link href="/available-room" key={index}>
              <div className="card-wrapper flex h-[215px] w-full gap-4 rounded-[30px] border bg-white p-4 transition-all duration-300 hover:border-[#91BF77]">
                <div className="flex h-[183px] w-[120px] shrink-0 overflow-hidden rounded-[30px]">
                  <Image
                    className="h-full w-full object-cover"
                    src={kos.image}
                    alt="kosan"
                    width={120}
                    height={183}
                  />
                </div>
                <div className="card-description gap-3 flex flex-col">
                  <h3 className="line-clamp-2 min-h-14 leading-7 text-ellipsis whitespace-pre-wrap font-poppins text-lg font-semibold">
                    {kos.name}
                  </h3>
                  <hr className="h-px w-full" />
                  <div id="location" className="flex flex-col gap-3">
                    <div className="inline-flex items-center gap-1">
                      <div className="flex h-5 w-5 shrink-0 overflow-hidden">
                        <Image
                          className="h-full w-full object-contain"
                          src="/images/icons/location.svg"
                          alt="location"
                          width={20}
                          height={20}
                        />
                      </div>
                      <p className="font-poppins text-sm text-ngekos-gray">Singapore City</p>
                    </div>
                    <div className="inline-flex items-center gap-1">
                      <div className="flex h-5 w-5 shrink-0 overflow-hidden">
                        <Image
                          className="h-full w-full object-contain"
                          src="/images/icons/profile-2user.svg"
                          alt="profile"
                          width={20}
                          height={20}
                        />
                      </div>
                      <p className="font-poppins text-sm text-ngekos-gray">4 People</p>
                    </div>
                  </div>
                  <hr className="h-px w-full" />
                  <p className="font-poppins text-lg font-semibold text-ngekos-orange">
                    Rp 4.593.444
                    <span className="text-sm font-normal text-ngekos-gray">/bulan</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
