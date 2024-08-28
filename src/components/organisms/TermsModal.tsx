import React from 'react';
import { Modal } from '../ui/Modal/Modal';
import { Typography } from '../ui/Typography/Typography';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ScreenLayout } from './ScreenLayout';

export function TermsModal({ onClose }: { onClose: () => void }) {

    return (
        <Modal title='Terms of service' onClose={onClose}>
            <ScreenLayout contentContainerStyle={{ gap: 8 }}>
                <Typography variant='h2'>1. Introduction</Typography>
                <Typography variant='body'>Welcome to Vocablo ("App").
                    This App is developed and operated by VilaCorp ("we", "us", or "our").
                    These Terms of Service ("Terms") govern your access to and use of the App,
                    including any content, functionality, and services offered on or through the App.
                </Typography>
                <Typography variant='h2'>2. User Accounts</Typography>
                <View style={{ gap: 4 }}>
                    <Typography style={style.sectionSubtitle}>2.1 Account Creation
                    </Typography>
                    <Typography variant='body'>To access certain features of Vocablo, such as saving vocabulary words and definitions,
                        you must create an account. When creating an account, you are required to provide a valid email address,
                        a unique username, and a secure password.
                    </Typography>
                </View>
                <View style={{ gap: 4 }}>
                    <Typography style={style.sectionSubtitle}>2.2 Account Security
                    </Typography>
                    <Typography variant='body'>
                        You are responsible for maintaining the confidentiality of your account information,
                        including your password. You agree to notify us immediately of any unauthorized access to or use of your account.
                        We will not be liable for any loss or damage arising from your failure to safeguard your account credentials.
                    </Typography>
                </View>
                <Typography style={style.sectionSubtitle}>2.3 Account Information
                </Typography>
                <Typography variant='body'>
                    We collect and store your username, email address, and password for the purposes of account creation and management.
                    We do not collect or store any other personal information. Your information is stored securely and will not be shared with third parties except as required by law.
                </Typography>
                <Typography variant='h2'>3. Use of the App</Typography>
                <Typography style={style.sectionSubtitle}>3.1 Permitted Use
                </Typography>
                <Typography variant='body'>
                    The App is provided solely for your personal, non-commercial use. You may use the App to search and save English vocabulary words and their definitions.
                </Typography>
                <Typography style={style.sectionSubtitle}>3.2 Prohibited Use
                </Typography>
                <Typography variant='body'>
                    You agree not to use the App in any way that:
                    Violates any applicable law or regulation.
                    Infringes on the rights of any third party.
                    Harms or exploits minors.
                    Attempts to interfere with the security or proper functioning of the App.
                </Typography>
                <Typography variant='h2'>4. Intellectual Property</Typography>
                <Typography variant='body'>All content available on the App, including but not limited to text, graphics, logos, and software,
                    is the property of VilaCorp or its licensors and is protected by intellectual property laws.
                    You may not reproduce, distribute, or create derivative works based on any content from the App without our express written permission.
                </Typography>
                <Typography variant='h2'>5. Privacy Policy</Typography>
                <Typography variant='body'>Our Privacy Policy [insert link to Privacy Policy] explains how we collect, use, and protect your personal information.
                    By using the App, you agree to the terms of our Privacy Policy.
                </Typography>
                <Typography variant='h2'>6. Termination</Typography>
                <Typography variant='body'>We reserve the right to suspend or terminate your access to the App at any time, without notice, for conduct that we believe
                    violates these Terms or is otherwise harmful to other users or us.
                </Typography>
                <Typography variant='h2'>7. Disclaimers</Typography>
                <Typography variant='body'>The App is provided on an "as is" and "as available" basis. We make no warranties or representations, express or implied, about the App,
                    including its accuracy, reliability, or availability. To the fullest extent permitted by law, we disclaim all warranties, express or implied, including but not
                    limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.
                </Typography>
                <Typography variant='h2'>8. Limitation of Liability</Typography>
                <Typography variant='body'>To the fullest extent permitted by law, VilaCorp shall not be liable for any indirect, incidental, special, consequential, or punitive damages,
                    including without limitation, loss of profits, data, use, or goodwill, arising out of or in connection with your use of the App.
                </Typography>
                <Typography variant='h2'>9. Changes to the Terms</Typography>
                <Typography variant='body'>We may update these Terms from time to time. Any changes will be effective immediately upon posting on the App.
                    Your continued use of the App following the posting of revised Terms means that you accept and agree to the changes.
                </Typography>
            </ScreenLayout>
        </Modal>
    )
}

const style = StyleSheet.create({
    sectionSubtitle: {
        fontFamily: 'MerriweatherSans-Bold',
        gap: 4
    },
})