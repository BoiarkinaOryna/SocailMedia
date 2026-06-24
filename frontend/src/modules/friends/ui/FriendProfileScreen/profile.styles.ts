import { COLORS } from '@shared/constants/colors';
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');



export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    scrollContent: {
        flexGrow: 1, 
        gap: 8,
        paddingTop: 8,
        paddingBottom: 200,
    },

    // PROFILE
    profileSection: {
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: 24,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.blue20
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    avatar: {
        width: 92,
        height: 92,
        borderRadius: 46,
    },
    avatarBadge: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.blue20,
        borderWidth: 3,
        borderColor: COLORS.white,
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.black,
        marginBottom: 4,
    },
    username: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.blue50,
        marginBottom: 20,
    },

    // STATS
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 32,
        marginBottom: 24,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: COLORS.blue10,
    },
    statNumber: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.black,
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 13,
        color: COLORS.blue50,
    },

    // BUTTONS
    buttonsContainer: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 24,
    },
    primaryBtn: {
        backgroundColor: COLORS.pulm,
        paddingVertical: 12,
        borderRadius: 20,
        minWidth: 110,
        alignItems: 'center',
    },
    primaryText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '600',
    },
    secondaryBtn: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.blue20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        minWidth: 10,
        alignItems: 'center',
    },
    secondaryText: {
        color: COLORS.black,
        fontSize: 14,
        fontWeight: '500',
    },

    // BLOCKS COMMON
    blockContainer: {
        borderWidth: 1,
        borderColor: COLORS.blue20,
        paddingTop: 16,
        backgroundColor: COLORS.white,
        borderRadius: 10
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    albumTitleBlock: {
        flexDirection: "row",
        gap: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.blue50,
    },
    viewAll: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.pulm,
    },

    // ALBUMS
    albumMeta: {
        paddingHorizontal: 24,
        marginBottom: 12,
    },
    albumTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.black,
    },
    albumSubtitleContainer: {
        flexDirection: 'row',
        marginTop: 2,
    },
    albumSubtitle: {
        fontSize: 13,
        color: COLORS.black,
    },
    albumYear: {
        fontSize: 13,
        color: COLORS.blue50,
        marginLeft: 6,
    },
    albumImage: {
        width: width - 48,
        height: 160,
        borderRadius: 14,
        marginHorizontal: 24,
        marginBottom: 12,
    },
});
