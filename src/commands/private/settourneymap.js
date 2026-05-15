import { SlashCommandBuilder, PermissionFlagsBits, inlineCode } from "discord.js";
import { getActiveTourney, getOngoingTourney, updateTourneyMap } from "../../lib/database.js";

// option: division, option: map name

export default {
  data: new SlashCommandBuilder()
    .setName("settourneymap")
    .setDescription("update a map for the upcoming tourney")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("division")
        .setDescription("map division")
        .setRequired(true)
        .addChoices(
          { name: "Diamond", value: "Diamond" },
          { name: "Platinum", value: "Platinum" },
          { name: "Gold", value: "Gold" },
          { name: "Silver", value: "Silver" },
          { name: "Bronze", value: "Bronze" },
          { name: "Steel", value: "Steel" },
          { name: "Wood", value: "Wood" },
        ),
    )
    .addStringOption((option) =>
      option.setName("map").setDescription("map name").setRequired(true),
    ),
  async execute(interaction) {
    await interaction.deferReply(); //thinking...
    const mapDivision = interaction.options.getString("division");
    const mapName = interaction.options.getString("map");
    const tourney = getActiveTourney();
    const isOngoing = getOngoingTourney() ? true : false;
    if (isOngoing) {
      interaction.editReply(`Couldn't change maps, as this tourney has already started.`);
      // } else if (tourney.class === "Demo" && mapDivision === "Wood") {
      //   interaction.editReply(`Couldn't change maps, since Demo doesn't have a Wood division.`);
    } else {
      if (tourney) {
        switch (mapDivision) {
          case "Diamond":
            tourney.diamond_map = mapName;
            break;
          case "Platinum":
            tourney.platinum_map = mapName;
            break;
          case "Gold":
            tourney.gold_map = mapName;
            break;
          case "Silver":
            tourney.silver_map = mapName;
            break;
          case "Bronze":
            tourney.bronze_map = mapName;
            break;
          case "Steel":
            tourney.steel_map = mapName;
            break;
          case "Wood":
            tourney.wood_map = mapName;
            break;
        }
        updateTourneyMap(tourney);

        interaction.editReply(`${tourney.class} tournament maps updated to..
  Diamond: ${inlineCode(tourney.diamond_map)}
  Platinum: ${inlineCode(tourney.platinum_map)}
  Gold: ${inlineCode(tourney.gold_map)}
  Silver: ${inlineCode(tourney.silver_map)}
  Bronze: ${inlineCode(tourney.bronze_map)}
  Steel: ${inlineCode(tourney.steel_map)}
  Wood: ${inlineCode(tourney.wood_map)}`);
      }
    }
  },
};
