"use client";

import { Fragment } from "react";
import { Flex, Button, Title, Stack, Text, Center, Box } from "@mantine/core";

import { makePath, MODALS, PAGES } from "@/packages/libraries";
import { AppShellHeader } from "@/components/admin/shared";
import { EmptySlot } from "@/components/shared/interface";
import { Markdown } from "@/components/shared/markdown";
import { modals } from "@mantine/modals";
import { ConfirmDelete } from "@/components/admin/shared/modals";
import { Attachments } from "@/components/admin/messages/attachments";

import {
  FlowContainer,
  FlowContentContainer,
  FlowPaper,
} from "@/components/layout";
import {
  useMessagesValue,
  ViewTypes,
} from "@/packages/hooks/use-messages-value";
import {
  AddIcon,
  ClockIcon,
  CurlyBackArrrow,
  EditIcon,
  TrashIcon,
} from "@/icons";

interface PageProps {
  params: {
    content: string;
  };
}

export default function Page({ params }: PageProps) {
  const {
    content: { id: contentId, view },
  } = useMessagesValue(params.content);

  const handleDelete = () => {
    modals.open({
      children: <ConfirmDelete title='message' />,
      withCloseButton: false,
      modalId: MODALS.CONFIRMATION,
    });
  };

  return (
    <Fragment>
      <AppShellHeader
        title='Message Details'
        backHref={makePath(PAGES.DASHBOARD, PAGES.MESSAGES)}
        showLinks={false}
        options={
          <HeaderOptions
            view={view}
            onClick={() => {}}
            onDelete={handleDelete}
          />
        }
      />
      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowPaper>
            {true ? (
              <Stack className='w-hull h-full p-5 sm:p-7'>
                <div className='space-y-2'>
                  <Title order={2} fz={16}>
                    {view === "occupants" ? "From:" : "To:"} <span>A10</span>
                  </Title>
                  <Flex align='center' gap={4}>
                    <ClockIcon width={14} height={14} />
                    <Text className='text-gray-300 space-x-1' fz={12}>
                      <span>21st of Aug., 2024</span>
                      <span>at</span>
                      <span>9:00AM</span>
                    </Text>
                  </Flex>
                </div>

                <Stack>
                  <Title order={2} c='plum.5' fz={20} fw={500}>
                    Meeting Minutes Review
                  </Title>

                  <FlowContainer p={20} mah={430}>
                    {/* <Markdown /> */}
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Id consectetur tempora cupiditate aspernatur repellat
                      reiciendis ullam earum dolorum eum, tenetur, dolores
                      pariatur magnam aliquam obcaecati natus iusto impedit sint
                      totam! Sed asperiores voluptates pariatur, aliquam dolore
                      quis! Esse dolorem sequi numquam. Aperiam, optio ea rerum
                      minus exercitationem perspiciatis at, iusto aspernatur
                      repudiandae adipisci, maiores dicta pariatur? Dicta porro
                      non tenetur. Suscipit nisi at impedit iste quas quo sequi
                      pariatur dicta, dolorum ipsa doloribus nam a? Quas
                      cupiditate voluptate debitis ea esse ex. Ratione
                      perspiciatis nobis quae quos labore deserunt architecto?
                      Laudantium nobis, quia provident explicabo tempore
                      laboriosam asperiores minima obcaecati quaerat esse odio
                      ipsam consectetur alias possimus optio in quas pariatur
                      quidem. Nisi consequuntur laboriosam impedit, sunt minima
                      dignissimos beatae. Nostrum totam qui hic excepturi dicta,
                      sit delectus esse quod, veritatis ipsum nemo quas harum
                      eos at modi quaerat molestiae consequatur atque
                      consequuntur voluptatum? Assumenda a provident eaque cum
                      ullam. Laudantium necessitatibus cum doloremque dolor, qui
                      illo iure voluptas veritatis odio, provident quidem
                      voluptates aliquam maxime, tenetur autem animi dicta
                      excepturi dolores nisi similique optio? Unde sapiente
                      distinctio natus ducimus. Reprehenderit illo cum
                      repudiandae, alias aperiam eius corporis quas sit neque
                      vitae sunt culpa suscipit modi provident deleniti
                      voluptatum facere amet quae. At, alias. Ab perferendis
                      maiores maxime autem inventore. Commodi magnam corporis
                      minima nostrum cum harum aperiam neque esse sunt delectus!
                      Facilis eius magni, distinctio animi perferendis odio
                      earum dolorum, odit rem ratione doloremque. Eligendi
                      corrupti aut deserunt quia. Voluptatum, dolore a natus ut
                      dignissimos ipsa iste incidunt velit beatae ea voluptate
                      nisi in ipsum qui est? Libero sit, quaerat a tempore
                      quisquam eum harum culpa ipsam totam debitis. Molestias
                      officia ipsam sed, eveniet blanditiis atque illo ullam
                      quibusdam culpa laudantium, laborum alias unde laboriosam
                      cum commodi neque. Delectus beatae aut ex tempora impedit
                      temporibus sit eum praesentium officia. Rem exercitationem
                      repellendus deserunt quam ipsam quia doloribus sit eius
                      atque magnam, obcaecati similique quibusdam omnis nisi
                      quas autem. Expedita vitae obcaecati quisquam veniam nam
                      soluta deserunt officia amet at? Obcaecati accusamus, quod
                      aut nobis exercitationem adipisci, numquam dolor atque
                      commodi error voluptatem corporis, eveniet voluptatibus
                      unde! Laborum iste officiis cupiditate animi culpa sit
                      quod. Omnis quisquam obcaecati perferendis magnam.
                      Deleniti velit quia, incidunt fugit temporibus facilis aut
                      impedit adipisci ex, veniam esse expedita minima
                      dignissimos, minus odio modi sit? Deleniti maiores quod
                      sequi laudantium atque iure illum eum magni! Sunt
                      consequuntur obcaecati excepturi quo beatae maxime
                      perferendis porro veritatis! Blanditiis repellat officiis,
                      tempora unde, dicta eos veritatis tenetur ad veniam
                      suscipit harum doloribus, maxime cum assumenda dolorem
                      culpa vitae. Ratione, debitis cum voluptatibus cumque
                      aliquid, quam necessitatibus eos molestiae, vel
                      perferendis fugit sunt commodi vitae illo porro iste
                      consequatur veniam incidunt natus numquam? Consectetur
                      molestiae mollitia vel sed veritatis. Facilis aperiam iste
                      dicta, minima aspernatur dignissimos alias ipsum facere
                      praesentium nulla ratione officia, accusamus laboriosam
                      eos dolor eius, rerum recusandae eum perspiciatis harum
                      iusto nostrum repudiandae? Laborum, provident repudiandae?
                      Totam minus, quod dolorum, repellat libero amet fugit
                      quibusdam adipisci veritatis eveniet quae expedita quo
                      incidunt pariatur eaque voluptate, dolor aut beatae
                      deserunt eos facilis animi. Voluptatem odit recusandae
                      qui. Alias soluta cupiditate tempora ea libero quo
                      praesentium sapiente fugiat, aspernatur laborum assumenda
                      molestiae atque ipsam nemo, adipisci numquam laboriosam
                      sint, inventore ut doloremque perspiciatis. Deserunt
                      asperiores distinctio laudantium quidem. Nulla delectus
                      fugiat tenetur exercitationem, ab vel minima explicabo
                      voluptates quae officia cumque, repellendus voluptas
                      libero error inventore, nisi ratione praesentium odit
                      adipisci dolorum doloremque iure rem suscipit. Eum, quae.
                      Deleniti ipsa nostrum possimus aliquam? Nulla accusantium
                      aperiam recusandae ut. Nemo quo recusandae, vero harum
                      modi doloribus labore id tenetur porro minima fugiat enim
                      veniam dicta, nostrum quibusdam quas sequi? Non assumenda
                      dicta id. Corrupti minima, vitae sapiente totam minus,
                      illum eos corporis perferendis voluptates adipisci
                      similique sed cum provident optio numquam quas molestiae
                      aliquid officia vero illo esse porro. Ducimus mollitia
                      officiis at esse harum consequatur laudantium, doloremque,
                      amet, sit facilis architecto aspernatur. Et molestias rem
                      laborum! Quia atque et mollitia distinctio ab quasi ipsa?
                      Quibusdam officia veritatis magni? Eaque suscipit
                      temporibus minima, officiis tempora fuga et modi minus,
                      voluptates a magni ullam dolorem nostrum enim quaerat iste
                      veniam quam sint vero! Officiis, tempora nesciunt
                      recusandae corporis dolorem aperiam. Hic, tenetur cumque
                      assumenda illum atque nobis ipsam, odio, quod aliquid vel
                      aut voluptates! Ut, iusto maiores doloribus, beatae
                      deleniti explicabo quia, officia provident excepturi
                      maxime praesentium debitis! Quae, cupiditate! Nisi
                      voluptatem sint pariatur natus mollitia, praesentium,
                      sequi culpa aspernatur harum ipsum sed, itaque iure ea
                      repellendus accusamus. Expedita quia, dicta quos possimus
                      cumque iure blanditiis nisi provident! Sed, numquam!
                      Architecto, tenetur repudiandae, quasi reiciendis,
                      sapiente sed commodi officia dolorum laborum reprehenderit
                      rem placeat veritatis est ut accusamus eum? Adipisci,
                      soluta quas rerum omnis ut error eum officiis? Aperiam,
                      eligendi. Rerum impedit, quia, quos deserunt ipsam,
                      consectetur accusantium inventore explicabo in atque ipsum
                      illo dolor dicta possimus iure? Officia officiis unde
                      corrupti nisi debitis voluptas ex quisquam alias optio
                      aperiam! Aliquid doloremque dignissimos praesentium neque
                      non est saepe odio provident voluptatem, earum similique
                      iusto perspiciatis cum rem tempora nesciunt numquam
                      voluptatibus consequatur et laborum dolor, sapiente sed.
                      Mollitia, labore aut! Numquam est doloribus quaerat
                      reprehenderit, modi, et ipsum voluptates minus, saepe
                      nihil neque explicabo incidunt aut? Soluta consectetur
                      ducimus sunt reiciendis labore autem blanditiis vel illo?
                      Maiores, vitae mollitia! Excepturi? Rerum ea pariatur
                      sequi iure ex, neque enim quod tempore, quaerat dicta
                      eveniet voluptates commodi laudantium fugit cupiditate
                      perferendis iste magnam illum veniam quas quae animi
                      eligendi dignissimos quo? Voluptate. Ea cumque ad vel a
                      modi dicta enim? Facere, accusantium. Distinctio dolorum
                      reiciendis odio. Corrupti voluptatem, maxime, fugiat,
                      quasi accusantium soluta quis delectus repellendus natus
                      vitae praesentium. Quibusdam, amet dolores? Nostrum
                      debitis quibusdam tenetur numquam quae natus vel veritatis
                      sit, maxime nulla. Excepturi cumque in fuga. Quos sapiente
                      eligendi alias facere! Et laboriosam eius, totam quos
                      voluptate quam ipsum odit? Placeat nam quod ut ducimus,
                      accusantium, minima ipsam harum, quibusdam alias inventore
                      odit incidunt at commodi nulla possimus dignissimos?
                      Quidem, ullam quisquam. Totam, delectus unde? Nulla
                      consequuntur sint corporis nihil. Eum alias dolorem magnam
                      asperiores facere voluptatibus delectus voluptates quas
                      quo suscipit, libero, omnis, neque hic vitae natus minus
                      nobis in a? Cumque velit quidem natus aliquam assumenda
                      quos suscipit? Earum impedit consequatur dolorum voluptas
                      odio, porro eum necessitatibus molestias deleniti
                      accusantium. Nobis laboriosam cum velit error! Eum saepe,
                      perferendis culpa molestiae recusandae animi dolor sequi
                      alias blanditiis est quo! Illum voluptates, id eveniet
                      enim placeat doloremque delectus in dolor tempore ratione
                      temporibus quod repellat rerum nesciunt sit laborum harum
                      necessitatibus non eius beatae quam aliquam iste ut
                      aperiam! Doloribus. Esse distinctio, quasi sequi iusto,
                      minima eveniet sapiente excepturi ab non aut corporis.
                      Numquam voluptate itaque quo harum nisi doloremque officia
                      vitae cum commodi ducimus tempore totam quis, deserunt a.
                      Nobis nostrum, harum laboriosam voluptatibus odio fuga a
                      molestiae quibusdam explicabo eligendi porro ratione enim
                      nemo iste consequatur maiores? Amet officia dolores
                      impedit voluptate sed perferendis qui recusandae, quae
                      odit? Recusandae consectetur voluptatibus perferendis.
                      Fuga voluptate iure, deserunt autem quasi exercitationem
                      sed eum dignissimos magni ab qui ad dolores suscipit
                      blanditiis minus reiciendis possimus sunt facilis
                      reprehenderit. Totam, illum blanditiis? Accusantium
                      repudiandae eaque ipsam quae reprehenderit ab. Incidunt
                      consectetur atque quae asperiores. Mollitia suscipit
                      consequuntur aspernatur veritatis, veniam ad, dolor non,
                      sed expedita delectus reprehenderit optio possimus
                      voluptatem repudiandae saepe! Sed voluptatem repellat
                      eaque, reiciendis iusto voluptate asperiores at id quos
                      placeat quibusdam natus similique, quis voluptas molestias
                      ut dolorum fugit reprehenderit hic enim perferendis neque.
                      Pariatur aliquam ducimus eos! Autem officiis aliquam,
                      facilis incidunt reprehenderit deleniti sequi quam labore.
                      Mollitia illo repellendus blanditiis esse ut voluptatem
                      sint consequatur. Obcaecati iusto minus recusandae
                      delectus nulla tempora voluptatum fugiat sequi facilis.
                      Corrupti, harum odio perspiciatis quisquam, soluta quasi
                      temporibus facere sint voluptatum ea quaerat perferendis
                      assumenda voluptate voluptas at possimus id iure nostrum
                      non recusandae porro unde! Nesciunt esse aut porro. Iusto
                      corrupti dolorem voluptates aut molestias praesentium cum
                      laudantium deleniti laboriosam excepturi odit iure
                      voluptatem magnam distinctio necessitatibus suscipit, enim
                      numquam. Veniam id, consequatur sapiente voluptate in
                      facere nihil unde. Aspernatur atque fugit iste culpa odit,
                      possimus error corporis magnam saepe tempore adipisci
                      repellat, ipsam laboriosam porro ab dicta id ratione
                      perferendis. Obcaecati tempora at, esse id molestiae
                      deleniti eos. Sint aut accusantium animi, deserunt
                      officiis mollitia rem alias? Quis praesentium quam
                      aspernatur, ratione at ex labore et harum libero maxime,
                      consequuntur saepe cumque vitae laudantium molestiae
                      temporibus dolores perspiciatis? Tempore, perferendis!
                      Quidem, molestiae rerum sed cum fugit accusantium
                      reprehenderit praesentium nesciunt aliquid pariatur
                      impedit natus tenetur. Maiores facilis incidunt cumque
                      nemo atque exercitationem expedita officia, aspernatur
                      tenetur pariatur voluptate! Blanditiis ea quasi
                      laboriosam, modi alias magnam! Nostrum alias quam, et
                      libero maiores atque esse tempora est veritatis numquam
                      eligendi blanditiis eveniet consequatur molestiae laborum
                      expedita quae nulla enim accusantium. Id beatae
                      dignissimos tempora quibusdam consequatur numquam ipsum!
                      Dolore atque, delectus eveniet esse quia, impedit saepe
                      nam nemo autem id eligendi veritatis optio illum
                      voluptates non eius adipisci, laudantium fugiat?
                      Repellendus reiciendis placeat delectus quia rem,
                      consectetur culpa laboriosam quasi explicabo magni.
                      Dolores recusandae officiis eveniet distinctio quaerat
                      cupiditate accusantium impedit quo fugiat animi dolorum
                      quia facilis, modi corporis cum.
                    </p>
                  </FlowContainer>
                </Stack>

                {true ? (
                  <Fragment>
                    <Title order={2} c='plum.5' fz={20} fw={500}>
                      Attachments
                    </Title>
                    <Attachments />
                  </Fragment>
                ) : (
                  <Text c='gray.5' fz={24} ta='center' mt={30}>
                    No attachments
                  </Text>
                )}
              </Stack>
            ) : (
              <EmptySlot
                title='Message not found. Start a conversation to stay connected!'
                src='no-talk'
                withButton
                text='Write a message'
                btnProps={{
                  leftSection: <AddIcon />,
                  component: "a",
                  href: makePath(
                    PAGES.DASHBOARD,
                    PAGES.ESTATES,
                    PAGES.ADD_NEW_ESTATE
                  ),
                }}
              />
            )}
          </FlowPaper>
        </FlowContentContainer>
      </FlowContainer>
    </Fragment>
  );
}

interface HeaderOptionsProps {
  view: ViewTypes;
  onClick: () => void;
  onDelete: () => void;
}

function HeaderOptions({ view, onClick, onDelete }: HeaderOptionsProps) {
  return (
    <Flex gap={14} wrap='wrap' align='center' justify='center'>
      {view === "occupants" ? (
        <Button fz='sm' size='md' variant='outline' onClick={onClick}>
          <Flex className='flex items-center gap-2'>
            <CurlyBackArrrow width={20} />
            <span className='hidden sm:inline'> Reply Message</span>
          </Flex>
        </Button>
      ) : (
        <Button fz='sm' size='md' variant='outline' onClick={onClick}>
          <Flex className='flex items-center gap-2'>
            <EditIcon width={18} />
            <span className='hidden sm:inline'> Edit Message</span>
          </Flex>
        </Button>
      )}

      <Button
        fz='sm'
        size='md'
        variant='outline'
        onClick={onDelete}
        color='#CC0404'
      >
        <Flex className='flex items-center gap-2'>
          <TrashIcon width={18} />
          <span className='hidden sm:inline'>Delete</span>
        </Flex>
      </Button>
    </Flex>
  );
}
