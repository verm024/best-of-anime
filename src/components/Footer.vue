<template>
    <div class="footer">
        <v-footer dark padless class="justify-center">
            <v-card max-width="800px" flat tile color="transparent" class="white--text text-center" >
                <v-card-text class="footer-title">
                    <div class="footer-title-1">BEST OF ANIME</div>
                    <div class="footer-title-2">INDONESIA</div>
                </v-card-text>
                <v-card-text class="white--text pt-0 footer-description">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate
                </v-card-text>
                <v-card-text class="footer-icon">
                    <v-btn v-for="icon in card.icons" :key="icon" class="mx-4 white--text" icon>
                        <v-icon size="24px">{{ icon }}</v-icon>
                    </v-btn>
                </v-card-text>
                <v-card-text class="footer-nav">
                    <v-btn text to="/login" class="navbar-item">
                        <span class="">SARAN</span>
                    </v-btn>
                    <v-btn text to="/login" class="navbar-item">
                        <span class="">TENTANG</span>
                    </v-btn>
                    <v-btn text to="/login" class="navbar-item">
                        <span class="">DONASI</span>
                    </v-btn>
                </v-card-text>
                <v-card-text class="white--text footer-copyright">
                    Copyright {{ new Date().getFullYear() }} <u>Best of Anime Indonesia</u>
                </v-card-text>
            </v-card>
        </v-footer>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            card: {
                icons: ['mdi-instagram', 'mdi-facebook', 'mdi-discord', 'mdi-email']
            }
        }
    }
}
</script>

<style scoped>
    .footer{
        margin-top: 270px;
        position: relative;
        box-shadow: 0px -4px 30px rgba(0, 0, 0, 0.25);
        margin-bottom: -16px;
    }

    .footer footer{   
        background: transparent !important;
    }

    .footer::before{
        content: '';
        position: absolute;
        background-image: url('https://drive.google.com/uc?export=view&id=1U5qmBOnAZeIW37al9NMXf3LIOSNKYBIo');
        background-size: cover;
        background-position: 100px;
        width: 150vw;
        min-height: 363px;
        margin-left: -50vw;
    }

    .footer-title{
        margin-top: 32px;
    }

    .footer-title-1{
        font-size: 20px;
        font-weight: 700;
    }

    .footer-title-2{
        font-size: 16px;
        font-weight: 600;
        color: #519A9E;
        margin-top: 5px;
    }

    .footer-description{
        font-size: 14px;
        font-weight: 300;
        color: #F4f4f6;
        margin-top: 16px;
    }

    .footer-icon{
        margin-bottom: -16px;
    }

    .footer-copyright{
        font-size: 12px;
        font-weight: 300;
        color: #F4f4f6;
    }

    .footer .navbar-item span{
        font-weight: 600;
        letter-spacing: 0;
        color: #519A9E;
    }
</style>